import React, { useState } from "react";
import { Input, Form, Popover, Button, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useLogout from '@/Hooks/useLogout';
import { updatePwd } from './apis';
import './view.scss';

const PasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const logout = useLogout();

  async function submit(values: any) {
    try {
      setLoading(true);
      await updatePwd(values);
      message.success("密码修改成功，请重新登陆");
      logout();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit_password_container">
      <h1 className="title">修改密码</h1>
      <Form
        className="form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={ submit }
      >
        {/* 防止浏览器自动输入密码 */}
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: "请输入旧密码" }]}
        >
          <Input.Password size="large" placeholder="旧密码" maxLength={16} />
        </Form.Item>
        <Popover
          placement="right"
          content={
            <div>
              <div>
                <ExclamationCircleFilled style={{ color: "#faad14" }} />
                <span style={{ marginLeft: 5 }}>密码长度6～16位</span>
              </div>
              <div>
                <ExclamationCircleFilled style={{ color: "#faad14" }} />
                <span style={{ marginLeft: 5 }}>密码只能包含数字密码</span>
              </div>
              <div>
                <ExclamationCircleFilled style={{ color: "#faad14" }} />
                <span style={{ marginLeft: 5 }}>不能包含字符</span>
              </div>
            </div>
          }
        >
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: "密码不能为空" },
              { pattern: /^[a-zA-Z0-9]{6,16}$/, message: "密码格式不正确" }
            ]}
          >
            <Input.Password size="large" placeholder="新密码" maxLength={16} />
          </Form.Item>
        </Popover>

        <Form.Item
          name="newPassword2"
          label="确认密码"
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("两次输入密码不一致!");
              }
            })
          ]}
        >
          <Input.Password size="large" placeholder="确认密码" maxLength={16} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordForm;
