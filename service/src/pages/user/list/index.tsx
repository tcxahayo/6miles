import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Avatar, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import EditForm from './components/EditForm';

import { TableListItem } from './data.d';
import { query } from './service';

export default () => {
  const [edit, setEdit] = useState<TableListItem | null>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      align: 'center',
      hideInSearch: true,
      render: (value: any) => {
        return <Avatar src={value} />;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: '账户',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      render: (value: any) => {
        if (!value) {
          return '未补充';
        }
        return value;
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createDate',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <Button type="link" onClick={() => setEdit(record)} icon={<EditFilled />}>
          编辑
        </Button>
      ),
    },
  ];

  function editCallback() {
    setEdit(null);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  async function request(params: any): Promise<any> {
    const queryParams = Object.assign(
      {
        size: params.pageSize,
        page: params.current,
      },
      params,
    );
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
      {/* 修改信息 */}
      <EditForm
        visible={!!edit}
        id={edit?.id}
        email={edit?.email}
        nickname={edit?.nickname}
        avatar={edit?.avatar}
        onCancel={() => setEdit(null)}
        onSuccessCallBack={editCallback}
      />
    </PageHeaderWrapper>
  );
};
