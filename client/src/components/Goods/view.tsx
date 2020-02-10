import React, { useState } from 'react';
import {IProps} from './index';
import './view.scss';
import '../../style/iconfont.scss';

const Goods: React.FC<IProps> = (props) => {
  const {img} = props;
  const [isCollect, setCollect] = useState(false);


  return (
    <div className="c_goods_container">
      <div className="box">
        <img src={img}
          alt="小鸟"
          className="img1" />
        <i className={`iconfont icon ${isCollect ? 'icon1' : ''}`} onClick={() => { setCollect(!isCollect) }}>&#xe614;</i>
        <div className="price">￥99.00</div>
        <div className="name">小鸟</div>
        <div className="user">
          <img src="https://pic.36krcnd.com/avatar/201712/19082638/3cmf5bqmm6aowdos.jpg!1200"
            alt="头像"
            className="avatar"
          />
          <div className="info">
            <div className="userName">你可以叫我崽崽</div>
            <div className="address">四川，成都</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goods;
