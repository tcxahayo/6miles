import React, { useState } from "react";
import "./view.scss";
import { actions } from "@/pages/App/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/app";
import { login, getUserInfo } from "./api";
import im from "@/lib/Im";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



interface Forms {
  phone: string;
  password: string;
}

const Login: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState<Forms>();

  const onFinish = (values: any) => {
    submit( { phone:values.phone,password:values.password })

  };

  //点击登录
  async function submit(parms:any) {
    const data = await login(parms);
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
        <div className="content-main">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
        </Button>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
