import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useUserInfo from '@/Hooks/useUserInfo';
import { State } from '@/store';
import { updateInfo } from './apis';
import { Input, Form, Spin, Button, Upload, message } from "antd";
import './view.scss';

interface FieldData {
  name: string[];
  value: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const InfoForm: React.FC = () => {
  const userInfo = useSelector((state: State) => state.app.userInfo);
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const updateUserInfo = useUserInfo();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [fields, setFields] = useState<FieldData []>();

  useEffect(() => {
    if (userInfo) {
      setFields([
        {name: ['avatar'], value: userInfo.avatar},
        {name: ['nickname'], value: userInfo.nickname},
        {name: ['email'], value: userInfo.email}
      ])
    }
  }, [userInfo])

  async function submit(values: any) {
    setSubmitLoading(true);
    try {
      await updateInfo(values);
      updateUserInfo();
      message.success('修改成功！');
    } finally {
      setSubmitLoading(false);
    }
  }

  function normFile(e: any) {
    setUpLoading(true);
    if (e.file.status === 'done') {
      setUpLoading(false);
      const image = e.file.response.data;
      setImage(image);
      return image;
    }
    return userInfo.avatar;
  }

  return (
    <div className="edit_info_container">
      <h2 className="title">修改资料</h2>
      <Form
        className="form"
        fields={fields}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={ submit }>
        <Form.Item
          label="头像"
          name="avatar"
          getValueFromEvent={normFile}
          rules={[
            {required: true, message: "头像不能为空", whitespace: true}
          ]}>
          <Upload
            accept="image/*"
            action="http://39.107.28.7:8080/file/upload"
            className="upload"
            name="file">
            <Spin spinning={upLoading} tip="上传中...">
              <img src={image ? image : userInfo?.avatar} alt=""/>
            </Spin>
          </Upload>
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            {required: true, message: "昵称不能为空", whitespace: true}
          ]}>
          <Input size="large" placeholder="昵称" maxLength={8} />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {type: "email" , message: "邮箱格式不正确", whitespace: true}
          ]}>
          <Input size="large" placeholder="邮箱地址" maxLength={8} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large" loading={submitLoading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default InfoForm;
