import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Spin, Avatar, message } from 'antd';

import { update } from '../service';

interface Props {
  visible?: boolean;
  onCancel?: () => void;
  onSuccessCallBack?: () => void;

  id?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
}

const EditForm: React.FC<Props> = (props) => {
  const {
    visible = false,
    onCancel,
    onSuccessCallBack,
    id = '',
    nickname = '',
    email = '',
    avatar = '',
  } = props;

  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);

  function normFile(e: any) {
    setUpLoading(true);
    if (e.file.status === 'done') {
      setUpLoading(false);
      const src = e.file.response.data as string;
      setImage(src);
      return src;
    }
    return avatar;
  }

  async function submit(values: any) {
    setSubmitLoading(true);
    const result = await update(Object.assign({ id }, values));
    setSubmitLoading(false);
    if (result.data) {
      message.success('修改成功！');
      if (onSuccessCallBack) onSuccessCallBack();
    } else {
      message.error(`修改失败：${result.msg}`);
    }
  }

  return (
    <Modal
      visible={visible}
      title="修改用户信息"
      confirmLoading={submitLoading}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form
        className="form"
        form={form}
        initialValues={{
          nickname,
          email,
          avatar,
        }}
        onFinish={submit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="头像" name="avatar" getValueFromEvent={normFile}>
          <Upload
            accept="image/*"
            action="http://39.107.28.7:8080/file/upload"
            className="upload"
            showUploadList={false}
            name="file"
          >
            <Spin spinning={upLoading} tip="上传中...">
              <Avatar size={60} src={image || avatar} />
            </Spin>
          </Upload>
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '昵称不能为空', whitespace: true }]}
        >
          <Input placeholder="昵称" maxLength={8} />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ type: 'email', message: '邮箱格式不正确', whitespace: true }]}
        >
          <Input placeholder="邮箱地址" maxLength={8} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
