import React, { useState } from 'react';
import { Icon } from 'antd';
import { Route } from 'react-router-dom';
import Goods from '@/pages/Goods'
import './view.scss';
import '../../style/iconfont.scss';

const Home: React.FC = () => {

  const [overlay, setOverlay] = useState(false);

  return (
    <div className="home_container">
      <div className="left">
        <ul className="category">
          <li
            className="item"
            onMouseLeave={() => setOverlay(false)}
            onMouseEnter={() => setOverlay(true)}>
            <div className="titleBox">
              <div className="titleLeft">
                <i className="iconfont icon">&#xe64c;</i>
                <h4 className="title">6miles短跑</h4>
              </div>
              <i className="iconfont icon iconArrow">&#xe600;</i>
            </div>

            <ul className="wrapper">
              <li>所有</li>
              <li>家居用品</li>
              <li>电子产品</li>
              <li>珠宝钟表</li>
              <li>时尚配饰</li>
              <li>服装</li>
              <li>鞋子</li>
            </ul>
          </li>
          <li
            className="item"
            onMouseLeave={() => setOverlay(false)}
            onMouseEnter={() => setOverlay(true)}>
            <div className="titleBox">
              <div className="titleLeft">
              <i className="iconfont icon">&#xe7a5;</i>
                <h4 className="title">家居用品</h4>
              </div>
              <i className="iconfont icon iconArrow">&#xe600;</i>
            </div>
            <ul className="wrapper">
              <li>家电</li>
              <li>寝具</li>
              <li>宠物用品</li>
              <li>工具</li>
              <li>家具</li>
              <li>园艺用品</li>
            </ul>
          </li>
          <li
            className="item"
            onMouseLeave={() => setOverlay(false)}
            onMouseEnter={() => setOverlay(true)}>
            <div className="titleBox">
              <div className="titleLeft">
              <i className="iconfont icon">&#xe602;</i>
                <h4 className="title">电子产品</h4>
              </div>
              <i className="iconfont icon iconArrow">&#xe600;</i>
            </div>
            <ul className="wrapper">
              <li>手机</li>
              <li>电脑</li>
              <li>电视</li>
              <li>冰箱</li>
              <li>洗衣机</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={`right ${overlay ? 'overlay' : ''}`}>
        <Route component={Goods} />
      </div>
    </div>
  )
}

export default Home;
