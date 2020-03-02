import React, { useState } from 'react';
import { IProps,collect } from './api';
import { Link} from 'react-router-dom';
import './view.scss';
import '../../style/iconfont.scss';


const Goods: React.FC<IProps> = (props) => {
  const { img, imageClassName, goodId } = props;
  const { title } = props;
  const { price } = props;
  const {userName} = props;
  const {avatar} = props;
  const [isCollect, setCollect] = useState(false);
  const [type,setType] = useState(1);

  function stop(e:any) {
    e.preventDefault()
    getCollect()
  }
  //添加收藏
   async function getCollect(){
     const data = await collect({goodsId:goodId,type:type})
     if(data == null){
      setCollect(!isCollect);
     }
   }

  return (
    <div className="c_goods_container">
      <Link  to={"/GoodsDetail/"+goodId} className="box">
        <img src={img} alt="小鸟" className={`img1 ${imageClassName}`} />
        <i className={`iconfont icon ${isCollect ? 'icon1' : ''}`} onClick={stop}>&#xe614;</i>
        <div className="price">￥{price}</div>
        <div className="name">{title}</div>
        <div className="user">
          <img src={avatar}
            alt="头像"
            className="avatar"
          />
          <div className="info">
  <div className="userName">{userName}</div>
            <div className="address">四川，成都</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Goods;
