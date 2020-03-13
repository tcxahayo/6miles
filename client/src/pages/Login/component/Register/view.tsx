import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Popover, message } from "antd";
import { MobileOutlined, LockOutlined, SafetyOutlined, ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import { getCode, register } from "./api";
import "./view.scss";

interface IProps {
  change: () => void;
}

const Register: React.FC<IProps> = (props) => {
  const [from] = Form.useForm();
  const [timing, setTiming] = useState(false);
  const [count, setCount] = useState(60);
  const [loding, setLoading] = useState(false);
  const { change } = props;

  useEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing])

  async function onGetCaptcha(phone: string) {
    if (!phone) {
      message.error('请输入手机号码');
      return false;
    }
    const result = await getCode(phone);
    if (result) {
      message.success("验证码已发送！");
      setTiming(true);
    }
  }

  async function onFinish(values: any) {
    setLoading(true);
    const result = await register(values);
    setLoading(false);
    if (result) {
      message.success('注册成功！');
      change();
      from.resetFields();
    }
  }

  return (
    <div className="c_register_container">
      <div className="form_container">
        <h1 className="title">欢迎来到6miles世界</h1>

        <Form className="form" form={from} onFinish={onFinish}>
          <input type="password" hidden autoComplete="new-password" />
          <Form.Item
            name="phone"
            rules={[
              {required: true, message: "手机号不能为空" },
              {pattern: /^1\d{10}$/, message: "手机号码格式不正确" },
            ]}>
            <Input size="large" placeholder="手机号" maxLength={11} prefix={<MobileOutlined />} />
          </Form.Item>

          <Form.Item
            name="nickname"
            rules={[
              {required: true, message: "昵称不能为空", whitespace: true}
            ]}>
            <Input size="large" placeholder="昵称" maxLength={8} prefix={<UserOutlined />} />
          </Form.Item>

          <Popover placement="right" content={
            <div>
              <div>
                <ExclamationCircleFilled style={{color: '#faad14'}} />
                <span style={{marginLeft: 5}}>密码长度6～16位</span>
              </div>
              <div>
                <ExclamationCircleFilled style={{color: '#faad14'}} />
                <span style={{marginLeft: 5}}>密码只能包含数字密码</span>
              </div>
              <div>
                <ExclamationCircleFilled style={{color: '#faad14'}} />
                <span style={{marginLeft: 5}}>不能包含字符</span>
              </div>
            </div>
          }>
            <Form.Item
              name="password"
              rules={[
                {required: true, message: "密码不能为空"},
                {pattern: /^[a-zA-Z0-9]{6,16}$/, message: "密码格式不正确" }
              ]}>
              <Input.Password size="large" placeholder="密码" maxLength={16} prefix={<LockOutlined />} />
            </Form.Item>
          </Popover>

          <Form.Item
            name="password2"
            rules={[
              {required: true, message: "请再次输入密码"},
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入密码不一致!');
                },
              })
            ]}>
            <Input.Password size="large" placeholder="确认密码" maxLength={16} prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldValue }) => (
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="code"
                    noStyle
                    rules={[{ required: true, message: '请输入4位验证码' }]}>
                    <Input size="large" placeholder="验证码" maxLength={4} prefix={<SafetyOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={8} offset={1}>
                  <Button
                    size="large"
                    block
                    disabled={timing}
                    onClick={() => {
                      const value = getFieldValue('phone');
                      onGetCaptcha(value);
                    }}>
                    {timing ? `${count} 秒` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            )}
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block loading={loding}>注册</Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={change} type="link" style={{padding: "unset"}}>已有账号，去登陆</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
