import React,{ useState } from 'react';
import './view.scss';
import {actions} from '@/pages/App/store';
import {useDispatch} from 'react-redux';
import {setToken} from '@/lib/app';
import {login, getUserInfo} from './api';

interface Form{
  phone:string,
  password:string
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>();
  //取消登录
  function handleModalClicked(){
    dispatch(actions.changeLoginModalAction());
  }
  //获取登录信息
  function getInfo(e:any){
    const value = e.target.value;
    switch(e.target.name){
      case "phone":
        setForm(Object.assign({}, form, {phone: value}));
        break;
      case "password":
        setForm(Object.assign({}, form, {password: value}));
        break;
    }
  }
  //点击登录
 async function submit(){
    const data = await login({...form})
    if(data){
      setToken(data);
      userInfo();
    }
  }
  //点击注册
  function toRegister(){
    dispatch(actions.changeRegisterModalAction());
    handleModalClicked()
  }
  //获取用户信息变化
  async function userInfo(){
    const data = await getUserInfo();
    if(data){
      dispatch(actions.setUserInfo(data));
      handleModalClicked();
    }
  }
  return (
    <div className="c_login_container" onClick={handleModalClicked}>
      <div className="content" onClick={e => e.stopPropagation()}>
        <div className="bg1"></div>
        <div className="message">
          <div className="title">登录</div>
          <div className="mid">
            <label htmlFor="name" className="name">账号:</label>
            <input type="text" id="name" name="phone" onChange={getInfo} />
            <label htmlFor="password">密码:</label>
            <input type="text" id="password" name="password" onChange={getInfo} />
          </div>
          <div className="submit" onClick={submit}>确定</div>
          <div className="login" onClick={toRegister}>点击注册</div>
        </div>
      </div>
    </div>
  )
}

export default Login;
