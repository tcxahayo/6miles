import React, { useState } from "react";
import { actions } from "@/pages/App/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/app";
import { login, getUserInfo } from "./api";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MobileOutlined, LockOutlined } from '@ant-design/icons'
import im from "@/lib/Im";
import "./view.scss";

interface IProps {
  change: () => void;
}

const Login: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { change } = props;
  const onFinish = (values: any) => {
    submit(values);
  };

  //点击登录
  async function submit(parms: any) {
    setLoading(true);
    const data = await login(parms);
    if (data) {
      setToken(data);
      userInfo();
    } else {
      setLoading(false);
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
      message.success('登陆成功！');
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="c_login_container">
      <div className="form_container">
        <h1 className="title">6Miles</h1>
        <Form className="form" onFinish={onFinish}>
          <Form.Item
            name="phone"
            rules={[
              {required: true, message: "手机号不能为空" },
              {pattern: /^1\d{10}$/, message: "手机号码格式不正确" },
            ]}>
            <Input size="large" placeholder="手机号" maxLength={11} prefix={<MobileOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {required: true, message: "密码不能为空"},
            ]}>
            <Input.Password size="large" placeholder="密码" maxLength={16} prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block loading={loading}>登录</Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={change} type="link" style={{padding: "unset"}}>没有账号？去注册</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
