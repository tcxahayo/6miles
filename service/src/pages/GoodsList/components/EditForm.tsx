import React, { useMemo, useState, useEffect } from 'react';
import { Modal, Form, Input, Cascader, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { TableListItem } from '../data.d';
import { Category } from '../../Category/data.d';

interface Props {
  visible?: boolean;
  value?: TableListItem;
  submitLoading?: boolean;
  category?: Category[];
  onCancel?: () => void;
  onSubmit?: (value: TableListItem) => void;
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const EditForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<any[]>([]);
  const { value, visible, onCancel, onSubmit, category, submitLoading } = props;

  useEffect(() => {
    if (value) {
      const imgs = value.images.split(',').map((item) => ({
        url: item,
        status: 'done',
        name: 'image.png',
        uid: item,
      }));
      setImages(imgs);
    }
  }, [value]);

  const formCategotyValue = useMemo(() => {
    if (value && category) {
      const arr: string[] = [];

      for (let i = 0; i < category.length; i += 1) {
        for (let j = 0; j < category[i].children.length; j += 1) {
          const child = category[i].children[j];
          if (child.id === value.categoryId) {
            arr.push(child.parentId);
            arr.push(child.id);
            break;
          }
        }
      }
      return arr;
    }
    return [];
  }, [value, category]);

  function submit(values: any) {
    const imgs = images.map((item) => item.url).join(',');
    const categoryId = values.category[1];
    if (onSubmit) onSubmit(Object.assign({}, value, values, { categoryId, images: imgs }));
  }

  return (
    <Modal
      title="修改商品"
      confirmLoading={submitLoading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      visible={visible}
    >
      <Form
        onFinish={submit}
        form={form}
        initialValues={{
          title: value?.title,
          category: formCategotyValue,
          price: value?.price,
          desc: value?.desc,
        }}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="商品标题" />
        </Form.Item>
        <Form.Item name="category" label="分类">
          <Cascader
            fieldNames={{ label: 'title', value: 'id', children: 'children' }}
            options={category}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item label="价格" name="price">
          <Input placeholder="商品价格" />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input placeholder="商品描述" />
        </Form.Item>
        <Form.Item label="图片">
          <Upload
            fileList={images as any[]}
            onChange={({ fileList, file }) => {
              const list = [...fileList];
              if (file.status === 'done') {
                const url = file.response.data;
                list[fileList.length - 1].url = url;
              }
              setImages(list);
            }}
            listType="picture-card"
            accept="image/*"
            action="http://39.107.28.7:8080/file/upload"
          >
            {images.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
