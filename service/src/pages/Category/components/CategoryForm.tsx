import React, { useEffect, useState, memo } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { save, update } from '../service';
import { Category, Response } from '../data.d';

interface Props {
  showCancel?: boolean;
  onCancel?: () => void;
  reLoad?: () => void;
  id?: string;
  parentId?: string;
  parentTitle?: string;
  title?: string;
  icon?: string | null;
  sort?: number;
}

const CategotyForm: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [from] = Form.useForm();
  const {
    id,
    parentId = '0',
    parentTitle = 'root',
    title = '',
    icon = '',
    sort = 0,
    showCancel = false,
    onCancel,
    reLoad,
  } = props;

  useEffect(() => {
    from.resetFields();
  }, [props]);

  async function submit(values: any) {
    setLoading(true);
    const data = Object.assign({ id, parentId }, values) as Category;
    let result: Response;
    if (id) {
      result = await update(data);
    } else {
      result = await save(data);
    }
    setLoading(false);
    if (result.data) {
      message.success('保存成功');
      // 刷新tree
      if (reLoad) reLoad();
      if (onCancel) onCancel();
    } else {
      message.error(result.msg);
    }
  }

  return (
    <Form
      form={from}
      labelCol={{ sm: 4, md: 8, lg: 8 }}
      wrapperCol={{ sm: 16, md: 16, lg: 12 }}
      initialValues={{
        title,
        icon,
        sort,
        parentTitle,
      }}
      onFinish={submit}
    >
      <Form.Item label="上级分类" name="parentTitle">
        <Input disabled />
      </Form.Item>
      <Form.Item label="标题" name="title">
        <Input placeholder="分类标题" />
      </Form.Item>
      <Form.Item label="图标" name="icon">
        <Input placeholder="分类图标" />
      </Form.Item>
      <Form.Item label="排序" name="sort" help="数字越小越靠前，最小为0">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, md: 16, lg: 12 }}>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={!id}
          style={{ marginRight: 24 }}
        >
          保存
        </Button>
        {showCancel && <Button onClick={onCancel}>取消</Button>}
      </Form.Item>
    </Form>
  );
};

export default memo(CategotyForm);
