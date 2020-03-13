import im from '@/lib/Im';
import { useHistory } from 'react-router-dom';
import { clearToken } from '@/lib/app';
import { actions } from '@/pages/App/store';
import { useDispatch } from 'react-redux';

export default function() {
  const dispatch = useDispatch();
  const history = useHistory();
  return function() {
    clearToken();
    dispatch(actions.setUserInfo(null));
    im.signout();
    history.push('/');
  }
}
