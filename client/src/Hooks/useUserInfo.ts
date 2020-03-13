import { useDispatch } from 'react-redux';
import { actions } from '@/pages/App/store';
import {getUserInfo} from '@/pages/Login/component/Login/api';

export default function () {
  const dispatch = useDispatch();
  return async function() {
    const data = await getUserInfo();
    if (data) {
      dispatch(actions.setUserInfo(data));
    }
  }
}
