import {createStore, combineReducers, compose} from 'redux';
import {app, IState} from '@/pages/App/store';

export interface State {
  app: IState
}

const reducers = combineReducers<State>({
  app
});


declare const window: any;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());
export default store;
