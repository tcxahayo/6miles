import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DownOutlined, WarningFilled } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Tree, Card, Alert, Button, Row, Col, Spin, Modal, message } from 'antd';
import styles from './index.less';
import CategoryForm from './components/CategoryForm';

import { query, del } from './service';
import { Category } from './data.d';

function mapDataToTreeNode(data: Category[]) {
  return data.map((item) => {
    return (
      <Tree.TreeNode title={item.title} key={item.id} data-source={item}>
        {mapDataToTreeNode(item.children)}
      </Tree.TreeNode>
    );
  });
}

export default () => {
  const [selectedTree, setSelectedTree] = useState<Category | null>();
  const [treeData, setTreeData] = useState<Category[] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);

  useEffect(() => {
    if (treeData === undefined) {
      (async function getData() {
        const result = await query();
        if (result.status === 200) {
          setTreeData(result.data);
        }
      })();
    }
  }, [treeData]);

  function reloadTreeData() {
    setSelectedTree(undefined);
    setTreeData(undefined);
  }

  function treeSelect(_: any[], { selected, node }: any) {
    if (selected as boolean) {
      const source = node['data-source'] as Category;
      setSelectedTree(source);
    } else {
      setSelectedTree(null);
    }
  }

  function removeCategory() {
    const modal = Modal.confirm({
      content: `确定要删除 ${selectedTree?.title} 分类？若存在子分类，则将一并删除，删除后不可恢复。`,
      icon: <WarningFilled />,
      okText: '删除',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await del(selectedTree?.id as string);
        if (result.data) {
          message.success('删除成功！');
          reloadTreeData();
        } else {
          message.error(`删除失败：${result.msg}`);
        }
      },
    });
  }

  return (
    <PageHeaderWrapper>
      <Row gutter={[24, 24]}>
        {/* 右侧树 */}
        <Col sm={24} md={8} lg={8}>
          <Card>
            <Alert message={`您已选中：${selectedTree ? selectedTree.title : ''}`} />
            <Button type="primary" className={styles.button} onClick={() => setShowModal(true)}>
              添加一级节点
            </Button>
            <Button
              type="primary"
              className={styles.button}
              onClick={() => setShowChildModal(true)}
              disabled={!(!!selectedTree && selectedTree.parentId === '0')}
            >
              添加子节点
            </Button>
            <Button
              type="primary"
              danger
              onClick={removeCategory}
              className={styles.button}
              disabled={!selectedTree}
            >
              删除分类
            </Button>
            <Spin spinning={treeData === undefined} style={{ display: 'block' }}>
              {treeData && (
                <Tree
                  defaultExpandAll
                  switcherIcon={<DownOutlined />}
                  onSelect={treeSelect}
                  showLine
                >
                  {mapDataToTreeNode(treeData)}
                </Tree>
              )}
            </Spin>
          </Card>
        </Col>
        {/* 左侧修改 */}
        <Col sm={24} md={16} lg={16}>
          <Card>
            <CategoryForm
              reLoad={reloadTreeData}
              title={selectedTree?.title}
              id={selectedTree?.id}
              parentId={selectedTree?.parentId}
              parentTitle={selectedTree?.parentTitle}
              icon={selectedTree?.icon}
              sort={selectedTree?.sort}
            />
          </Card>
        </Col>
      </Row>
      {/* 添加分类 */}
      <Modal
        title="添加分类"
        maskClosable
        footer={null}
        destroyOnClose
        onCancel={() => setShowModal(false)}
        visible={showModal}
      >
        <CategoryForm showCancel reLoad={reloadTreeData} onCancel={() => setShowModal(false)} />
      </Modal>
      {/* 添加子分类 */}
      <Modal
        title="添加分类"
        maskClosable
        footer={null}
        destroyOnClose
        onCancel={() => setShowChildModal(false)}
        visible={showChildModal}
      >
        <CategoryForm
          showCancel
          parentId={selectedTree?.id}
          parentTitle={selectedTree?.title}
          reLoad={reloadTreeData}
          onCancel={() => setShowChildModal(false)}
        />
      </Modal>
    </PageHeaderWrapper>
  );
};
