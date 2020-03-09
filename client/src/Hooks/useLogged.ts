import {getToken} from '@/lib/app';

/**
 * 判断用户是否已经登陆
 */
function useLogged() {
  return getToken();
}

export default useLogged;
