import React, { Fragment, useEffect, useState } from 'react';
import './view.scss';
import '../../style/iconfont.scss';
import Product from '@/components/Goods';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '@/store';
import { useDispatch } from 'react-redux';
import { actions } from '@/pages/App/store';
import { getUserInfo } from '../../components/Login/api';
import Order from '@/pages/Order/view';
import { getPublishList, IGoods, getCollectList } from './apis'

declare const BMap: any;

const Profile: React.FC = () => {
  const [order, setOrder] = useState(true);
  const [cllect, setCollect] = useState(false);
  const [publish, setPublish] = useState(false);
  const [list, setPubList] = useState<IGoods[]>([]);
  const [cList, setClist] = useState<IGoods[]>([]);
  const useInfo = useSelector((state: State) => state.app.userInfo);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      userInfo();
    }
    publishList();
    collectList();
  }, [])

  //获取用户信息
  async function userInfo() {
    const data = await getUserInfo();
    if (data) {
      dispatch(actions.setUserInfo(data));

    }
  }

  //获取发布列表
  async function publishList() {
    const data = await getPublishList();
    setPubList(data);

  }
  //获取收藏列表
  async function collectList() {
    const data = await getCollectList();
    setClist(data);

  }


  useEffect(() => {
    //定位
    const myCity = new BMap.LocalCity();
    myCity.get((result: any) => {
      var myPoint = result.center;
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(myPoint), 15); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.centerAndZoom(myPoint, 11);                 // 初始化地图，设置中心点坐标和地图级别
      map.addControl(new BMap.GeolocationControl());
      console.log(BMap.GeolocationControl())
    })

  }, [])

  //点击order
  function changeOrder() {
    setOrder(!order);
    setCollect(false);
    setPublish(false);
  }
  //点击收藏
  function changeCollect() {

    setOrder(false);
    setCollect(true);
    setPublish(false);
  }
  //点击已发布
  function changePublish() {
    setOrder(false);
    setCollect(false);
    setPublish(true);
    console.log(list.length)
  }

  return (
    <Fragment>
      <div className="profile_container">
        <div className="map" id="allmap"></div>
        <div className="userInfo">
          <div className="avater">
            <img className="avaterImg" src={useInfo.avatar} alt="" />
            <div className="edit">
              <i className="iconfont icnoEdit">&#xe615;</i>
              <Link to="/edit">
                <span className="editTxt">编辑</span>
              </Link>
            </div>
          </div>
          <div className="userDesc">
            <div className="name">{useInfo.nickname}</div>
            <div className="icnoBox">
              <i className="iconfont phone">&#xe624;
                <span className="phoneNum">{useInfo.phone}</span>
              </i>
              <i className="iconfont email">&#xe639;
                <span className="emailNum">{useInfo.email ? useInfo.email : "empty"}</span>
              </i>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="menu">
            <div className={`order ${order ? "active" : ''}`} onClick={changeOrder}>0个订单</div>
  <div className={`collect ${cllect ? "active" : ''}`} onClick={changeCollect}>{cList.length}个收藏</div>
  <div className={`publish ${publish ? "active" : ''}`} onClick={changePublish}>{list.length}个已发布</div>
          </div>
          <div className="detail">
            {/* 订单 */}
            {
              order && (
                <Fragment>
                  <Order />
                </Fragment>
              )
            }
            {/* 收藏 */}
            {
              cllect && cList.length && cList.map((item, index) => {
                return (
                  <Fragment>
                    <Product
                      imageClassName="img2"
                      img={item.images}
                      title={item.title}
                      price={item.price}
                      userName={item.user.nickname}
                      avatar={item.user.avatar}
                    />
                  </Fragment>
                )
              }) || cllect && (
                <Fragment>
                  <Link to="/" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">来一单吧~</div>
                  </Link>
                </Fragment>
              )
            }
            {/* 已发布 */}
            {
              publish && list.length && list.map((item, index) => {
                return (
                  <Fragment>
                    <Product
                      imageClassName="img2"
                      img={item.images}
                      title={item.title}
                      price={item.price}
                      userName={item.user.nickname}
                      avatar={item.user.avatar}
                    />
                  </Fragment>
                )
              }) || publish && (
                <Fragment>
                  <Link to="/release" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">发布我的第一个商品~</div>
                  </Link>
                </Fragment>
              )
            }

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile;
