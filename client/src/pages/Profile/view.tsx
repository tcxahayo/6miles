import React, { Fragment, useEffect, useState } from "react";
import "./view.scss";
import "../../style/iconfont.scss";
import Product from "@/components/Goods";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@/store";
import { useDispatch } from "react-redux";
import { actions } from "@/pages/App/store";
import { getUserInfo } from "../Login/component/Login/api";
import Order from "@/pages/Order/view";
import { getPublishList, IGoods, getCollectList } from "./apis";

declare const AMap: any;

const Profile: React.FC = () => {
  const [order, setOrder] = useState(true);
  const [cllect, setCollect] = useState(false);
  const [publish, setPublish] = useState(false);
  const [list, setPubList] = useState<IGoods[]>([]);
  const [cList, setClist] = useState<IGoods[]>([]);
  const [length, setLength] = useState();
  const [index, setIndex] = useState();

  const useInfo = useSelector((state: State) => state.app.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    publishList();
  }, []);
  useEffect(() => {
    collectList();
    console.log(index);
  }, [index]);

  function len(parm: any) {
    setLength(parm);
  }

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
  }
  //定位
  useEffect(() => {
    var myMap = new AMap.Map("allmap", {
      resizeEnable: true,
      center: [116.397428, 39.90923],
      zoom: 18
    });
    AMap.plugin(["AMap.CitySearch", "AMap.Geolocation"], function() {
      var citySearch = new AMap.CitySearch();
      var geolocation = new AMap.Geolocation();
      myMap.addControl(geolocation);
      citySearch.getLocalCity(function(status: any, result: any) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          myMap.setBounds(result.bounds);
          console.log(result);
        }
      });
    });
  }, []);

  function changeCList() {
    collectList();
  }

  return (
    <Fragment>
      <div className="profile_container">
        <div className="map" id="allmap"></div>
        <div className="userInfo">
          <div className="avater">
            <img className="avaterImg" src={useInfo?.avatar} alt="" />
            <div className="edit">
              <i className="iconfont icnoEdit">&#xe615;</i>
              <Link to="/edit">
                <span className="editTxt">编辑</span>
              </Link>
            </div>
          </div>
          <div className="userDesc">
            <div className="name">{useInfo?.nickname}</div>
            <div className="icnoBox">
              <i className="iconfont phone">
                &#xe624;
                <span className="phoneNum">{useInfo?.phone}</span>
              </i>
              <i className="iconfont email">
                &#xe639;
                <span className="emailNum">
                  {useInfo?.email ? useInfo?.email : "empty"}
                </span>
              </i>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="menu">
            <div
              className={`order ${order ? "active" : ""}`}
              onClick={changeOrder}
            >
              {length}个订单
            </div>
            <div
              className={`collect ${cllect ? "active" : ""}`}
              onClick={changeCollect}
            >
              {cList.length}个收藏
            </div>
            <div
              className={`publish ${publish ? "active" : ""}`}
              onClick={changePublish}
            >
              {list.length}个已发布
            </div>
          </div>
          <div className="detail">
            {/* 订单 */}
            {order && (
              <Fragment>
                <Order getLength={len} />
              </Fragment>
            )}
            {/* 收藏 */}
            {(cllect &&
              cList.length &&
              cList.map((item, index) => {
                return (
                  <Fragment>
                    <Product
                      imageClassName="img2"
                      img={item.images}
                      title={item.title}
                      price={item.price}
                      userName={item.user.nickname}
                      avatar={item.user.avatar}
                      collection={item.collection}
                      index={index}
                      goodId={item.id}
                      changeIndex={changeCList}
                    />
                  </Fragment>
                );
              })) ||
              (cllect && (
                <Fragment>
                  <Link to="/" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">来一单吧~</div>
                  </Link>
                </Fragment>
              ))}
            {/* 已发布 */}
            {(publish &&
              list.length &&
              list.map((item, index) => {
                return (
                  <Fragment>
                    <Product
                      imageClassName="img2"
                      img={item.images}
                      title={item.title}
                      price={item.price}
                      userName={item.user.nickname}
                      avatar={item.user.avatar}
                      collection={item.collection}
                      index={index}
                      goodId={item.id}
                    />
                  </Fragment>
                );
              })) ||
              (publish && (
                <Fragment>
                  <Link to="/release" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">发布我的第一个商品~</div>
                  </Link>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
