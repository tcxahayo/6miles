import React from "react";
import PasswordForm from './components/PasswordForm';
import InfoForm from './components/InfoForm';
import { Tabs } from 'antd';
import "../../style/iconfont.scss";
import "./view.scss";

const Edit: React.FC = () => {
  return (
    <div className="edit_container">
      <Tabs defaultActiveKey="1" className="tabs" tabPosition="left">
        <Tabs.TabPane
          tab={
            <span className="tabPane">基本资料</span>
          }
          key="1">
          <InfoForm />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="tabPane">修改密码</span>
          }
          key="2">
          <PasswordForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Edit;
