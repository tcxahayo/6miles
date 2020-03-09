import store from '@/store';

/**
 * 判断用户是否已经登陆
 */
function useLogged() {
  const userInfo = store.getState().app.userInfo
  return userInfo;
}

export default useLogged;
