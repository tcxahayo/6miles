import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Avatar, Button, message, Modal } from 'antd';
import { EditFilled, DeleteFilled, WarningFilled } from '@ant-design/icons';

import EditForm from './components/EditForm';
import { TableListItem } from './data.d';
import { query, goodsEdit, del } from './service';
import { query as categotyQuery } from '../Category/service';
import { Category } from '../Category/data.d';

export default () => {
  const [edit, setEdit] = useState<TableListItem | undefined>();
  const [category, setCategory] = useState<Category[]>();
  const [updateLoading, setUpdateLoading] = useState(false);
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    (async function t() {
      const result = await categotyQuery();
      if (result.data) {
        setCategory(result.data);
      }
    })();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '商品名称',
      dataIndex: 'title',
    },
    {
      title: '价格',
      hideInSearch: true,
      dataIndex: 'price',
    },
    {
      title: '图片',
      dataIndex: 'images',
      hideInSearch: true,
      render(value: any) {
        return (
          <>
            {value.split(',').map((item: string) => {
              return <img src={item} alt="" style={{ height: 20, width: 20 }} key={item} />;
            })}
          </>
        );
      },
    },
    {
      title: '发布人',
      dataIndex: 'user',
      hideInSearch: true,
      render(value: any) {
        return (
          <>
            <Avatar src={value.avatar} style={{ marginRight: 5 }} />
            {value.nickname}
          </>
        );
      },
    },
    {
      title: '发布日期',
      dataIndex: 'createDate',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => setEdit(record)} icon={<EditFilled />}>
            编辑
          </Button>
          <Button type="link" onClick={() => delGoods(record.id)} danger icon={<DeleteFilled />}>
            删除
          </Button>
        </>
      ),
    },
  ];

  function delGoods(id: string) {
    Modal.confirm({
      content: '确定删除该商品？删除后不可恢复',
      icon: <WarningFilled />,
      okText: '删除',
      onOk: async () => {
        const result = await del(id);
        if (result.data) {
          message.success('删除成功！');
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } else {
          message.error(`删除失败：${result.msg}`);
        }
      },
    });
  }

  async function update(item: TableListItem) {
    setUpdateLoading(true);
    const result = await goodsEdit(item);
    if (result.data) {
      if (actionRef.current) actionRef.current.reload();
      message.success('修改成功！');
      setUpdateLoading(false);
      setEdit(undefined);
    } else {
      message.error(`修改失败：${result.msg}`);
    }
  }

  async function request(params: any): Promise<any> {
    const queryParams = {
      size: params.pageSize,
      page: params.current,
      keyword: params.title,
    };
    const result = await query(queryParams);

    return new Promise<any>((resolve) => {
      const tableList = {
        data: result.data.list,
        success: true,
        pageSize: result.data.size,
        current: result.data.page,
        total: result.data.totalSize,
      };
      resolve(tableList);
    });
  }

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => request(params)}
        columns={columns}
        rowSelection={{}}
      />
      <EditForm
        value={edit}
        visible={!!edit}
        category={category}
        submitLoading={updateLoading}
        onSubmit={update}
        onCancel={() => setEdit(undefined)}
      />
    </PageHeaderWrapper>
  );
};
