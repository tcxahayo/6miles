import React, { useState } from "react";
import "./view.scss";
import { actions } from "@/pages/App/store";
import { useDispatch } from "react-redux";
import "../../style/iconfont.scss";
import { getCode, register } from "./api";

interface Form {
  nickname: string;
  password: string;
  password2: string;
  phone: string;
  code: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setform] = useState<Form>();
  const [show, setShow] = useState(false);
  const [right, setRight] = useState(false);
  const [use, setUse] = useState(false);
  const [send, setSend] = useState(true);
  const [time, setTime] = useState(60);

  //取消注册
  function handleModalClicked() {
    dispatch(actions.changeRegisterModalAction());
  }
  //获取code
  async function sendPhone() {
    setSend(false);
    timer();
    if (form && form.phone) {
      const data = await getCode(form.phone);
      if (data) {
        console.log("发送成功");
      } else {
        console.log("发送失败");
      }
    }
  }
  //倒计时
  function timer() {
    const time1 = setInterval(function() {
      setTime(t => {
        if (t === 0) {
          clearInterval(time1);
          setTime(60);
          setSend(true);
        }
        return t - 1;
      });
    }, 1000);
  }
  //获取输入值
  function changeValue(e: any) {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setform(Object.assign({}, form, { nickname: value }));
        break;
      case "password":
        if (value.length > 6) {
          setShow(true);
        } else {
          setShow(false);
        }
        setform(Object.assign({}, form, { password: value }));
        break;
      case "passwordAgain":
        if (value === form?.password) {
          setRight(true);
          setUse(false);
        } else {
          setRight(false);
        }
        setform(Object.assign({}, form, { password2: value }));
        break;
      case "phone":
        if (form?.password !== form?.password2) {
          setUse(true);
        } else {
          setUse(false);
        }
        setform(Object.assign({}, form, { phone: value }));
        break;
      case "code":
        setform(Object.assign({}, form, { code: value }));
    }
  }
  async function submit() {
   if (form) {
    const data = await register({ ...form });
    if (data) {
      login();
    }
   }
  }
  //跳转登录
  function login() {
    dispatch(actions.changeLoginModalAction());
    handleModalClicked();
  }

  return (
    <div className="c_register_container" onClick={handleModalClicked}>
      <div className="content" onClick={e => e.stopPropagation()}>
        <div className="bg1"></div>
        <div className="message">
          <div className="title">欢迎来到6miles的世界</div>
          <div className="mid">
            <label htmlFor="name" className="name">
              用户名:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={changeValue}
              value={form?.nickname}
            />
            <label htmlFor="password">密码:</label>
            <input
              type="password"
              placeholder="6-16位数字或字母"
              id="password"
              name="password"
              onChange={changeValue}
              value={form?.password}
              maxLength={16}
            />
            <i
              className="iconfont icno"
              style={show ? { display: "inline-block" } : { display: "none" }}
            >
              &#xe638;
            </i>
            <label htmlFor="passwordAgain">确认密码:</label>
            <input
              type="password"
              id="passwordAgain"
              name="passwordAgain"
              onChange={changeValue}
            />
            <i
              className="iconfont icno2"
              style={right ? { display: "inline-block" } : { display: "none" }}
            >
              &#xe638;
            </i>
            <i
              className="iconfont icno3"
              style={use ? { display: "inline-block" } : { display: "none" }}
            >
              &#xe603;
            </i>
            <label htmlFor="phone">电话号码:</label>
            <input type="text" id="phone" name="phone" onChange={changeValue} />
            <label htmlFor="code">验证码:</label>
            <input type="text" id="code" name="code" onChange={changeValue} />
            <div
              className="send"
              onClick={sendPhone}
              style={send ? { display: "inline-block" } : { display: "none" }}
            >
              获取
            </div>
            <div
              className="sended"
              style={send ? { display: "none" } : { display: "inline-block" }}
            >
              重新获取<span>{time}</span>
            </div>
          </div>
          <div className="submit" onClick={submit}>
            确定
          </div>
          <div className="login" onClick={login}>
            已有账号，登录
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
