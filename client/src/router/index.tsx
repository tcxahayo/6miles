import React from 'react';
import useLogged from '@/Hooks/useLogged';
import { Route, Redirect } from 'react-router-dom';

export interface IRoute {
  path: string;
  component: React.FC<any>;
  isLogin: boolean;
  exact?: boolean;
}

export default function renderRoute(routes: IRoute[]) {
  return (
    routes.map(item => {
      return (
        <Route
          path={item.path}
          exact={item.exact}
          render={(props) => {
            const logged = useLogged()
            if (item.isLogin && !logged) {
              return <Redirect to='/login' />
            }
            return <item.component {...props} />
          }}
        />
      )
    })
  )
}
