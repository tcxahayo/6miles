import React, { useState, Fragment } from 'react';
import { IProps, collect } from './api';
import { Link , useHistory } from 'react-router-dom';
import './view.scss';
import '../../style/iconfont.scss';
import { message } from 'antd';


const Goods: React.FC<IProps> = (props) => {
  const { img, imageClassName, goodId, collection, area, profile } = props;
  const { title } = props;
  const { price } = props;
  const { userName } = props;
  const { avatar } = props;
  const [isCollect, setCollect] = useState(collection);
  const history = useHistory();

  console.log(profile)
  async function stop(e: any) {
    e.preventDefault()
    await collect({ goodsId: goodId, type: isCollect ? 2 : 1 })
    if (props.changeIndex) {
      props.changeIndex()
      if (isCollect) {
        message.error('取消收藏', 2)
      } else {
        message.success('收藏成功', 2)
      }
    } else {
      setCollect(!isCollect)
      if (isCollect) {
        message.error('取消收藏', 2)
      } else {
        message.success('收藏成功', 2)
      }
    }
  }

  function editGoods(){
    history.push({
      pathname:'/GoodsDetail/'+goodId,
      state:{
        profile:profile
      }
    })
  }


  return (
    <div className="c_goods_container">
      {
        profile && (
          <Fragment>
            <div onClick={editGoods} className="box">
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
                  <div className="address">{area}</div>
                </div>
              </div>
            </div>
          </Fragment>
        ) || (
          <Fragment>
            <Link to={"/GoodsDetail/" + goodId} className="box">
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
                  <div className="address">{area}</div>
                </div>
              </div>
            </Link>
          </Fragment>
        )
      }

    </div>
  )
}

export default Goods;
