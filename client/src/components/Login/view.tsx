import React, { useState } from "react";
import "./view.scss";
import { actions } from "@/pages/App/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/app";
import { login, getUserInfo } from "./api";
import im from "@/lib/Im";
import { Link, useHistory } from "react-router-dom";

interface Form {
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState<Form>();

  //获取登录信息
  function getInfo(e: any) {
    const value = e.target.value;
    switch (e.target.name) {
      case "phone":
        setForm(Object.assign({}, form, { phone: value }));
        break;
      case "password":
        setForm(Object.assign({}, form, { password: value }));
        break;
    }
  }
  //点击登录
  async function submit() {
    const data = await login({ ...form });
    if (data) {
      setToken(data);
      userInfo();
    }
  }

  //获取用户信息变化
  async function userInfo() {
    const data = await getUserInfo();
    if (data) {
      // 登陆完成
      dispatch(actions.setUserInfo(data));
      im.getFriends();
      history.goBack();
    }
  }

  return (
    <div className="c_login_container">
      <div className="content" onClick={e => e.stopPropagation()}>
        <div className="bg1"></div>
        <div className="message">
          <div className="title">登录</div>
          <div className="mid">
            <label htmlFor="name" className="name">
              账号:
            </label>
            <input type="text" id="name" name="phone" onChange={getInfo} />
            <label htmlFor="password">密码:</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={getInfo}
            />
          </div>
          <div className="submit" onClick={submit}>
            确定
          </div>
          <div className="login">
            <Link to="/register" replace>
              点击注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
