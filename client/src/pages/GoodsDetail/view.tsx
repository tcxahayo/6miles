import React, { useRef, useState, useEffect, Fragment } from "react";
import { Carousel, message } from "antd";
import Product from "@/components/Goods";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { conectGoods, Details, RelatedList } from "./api";
import { actions } from "@/pages/Chat/store";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/store";
import "../../style/iconfont.scss";
import "./view.scss";
import { collect } from "../../components/Goods/api";

interface Params {
  id: string;
}

const GoodsDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const location = useLocation();
  const carousel = useRef<any>();
  const user = useSelector((state: State) => state.app.userInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isCollect, setCollect] = useState(false);
  const [good, setGood] = useState<Details>();
  const [img, setImg] = useState<string[]>([]);
  const [conGoods, setConectGood] = useState<RelatedList[]>([]);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (location.state && location.state.profile) {
      setProfile(location.state.profile);
    }
  }, [location]);

  useEffect(() => {
    conectGood(id);
  }, [id]);
  //相关商品以及商品详情
  async function conectGood(param: any) {
    const data = await conectGoods(param);
    if (data) {
      const imgs = data.details.images.split(",");
      setGood(data.details);
      setImg(imgs);
      setCollect(data.details.collection);
      setConectGood(data.relatedList);
    }
  }

  function changeCarousel(index: number) {
    carousel.current.goTo(index);
  }

  function contactSeller() {
    if (!user) {
      message.error("还未登陆，请先登陆！");
      return false;
    }
    if (!good) return false;
    dispatch(
      actions.putChatItem({
        id: `${user.phone}#${good.user.phone}`,
        avatar: good.user.avatar,
        nickname: good.user.nickname,
        chatLog: []
      })
    );
    history.push("/chat");
  }

  function collection() {
    if (good) {
      setCollection({ goodsId: good.id, type: isCollect ? 2 : 1 });
      setCollect(!isCollect);
    }
  }
  //取消收藏和收藏接口
  async function setCollection(params: any) {
    await collect(params);
  }
  //跳转修改
  function editGoods() {
    history.push({
      pathname: "/release",
      state: {
        id: id
      }
    });
  }

  return (
    <div className="detail_container">
      <div className="goods">
        <div className="goods_left">
          <div className="imgBox">
            <Carousel ref={carousel}>
              {img.map((item: any, index: any) => {
                return (
                  <div className="img">
                    <img src={item} alt="" />
                  </div>
                );
              })}
            </Carousel>
            <div className="imgIndex">
              {img.map((item, index) => {
                return (
                  <img
                    key={item}
                    onClick={() => {
                      changeCarousel(index);
                    }}
                    src={item}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="goods_right">
          <div className="goods_title">{good?.title}</div>
          <div className="goods_price">
            <i className="iconfont icno-price">&#xe610;</i>
            <span className="price_num">{good?.price}</span>
          </div>
          <div className="goods_address">
            <i className="iconfont icno-address">&#xe629;</i>
            <span className="address_info">{good?.area}</span>
          </div>
          {(profile && (
            <Fragment>
              <div
                className="add_collection"
                onClick={collection}
                style={{ visibility: "hidden" }}
              >
                <i
                  className="iconfont icno-collection"
                  style={isCollect ? { color: "red" } : { color: "#fff" }}
                >
                  &#xe614;
                </i>
                <span
                  className="collection_txt"
                  style={isCollect ? { color: "red" } : { color: "#fff" }}
                >
                  收藏
                </span>
              </div>
              <div onClick={editGoods} className="buy">
                修改
              </div>
              <div
                className="chat"
                onClick={contactSeller}
                style={{ visibility: "hidden" }}
              >
                联系卖家
              </div>
            </Fragment>
          )) || (
            <Fragment>
              <div className="add_collection" onClick={collection}>
                <i
                  className="iconfont icno-collection"
                  style={isCollect ? { color: "red" } : { color: "#fff" }}
                >
                  &#xe614;
                </i>
                <span
                  className="collection_txt"
                  style={isCollect ? { color: "red" } : { color: "#fff" }}
                >
                  收藏
                </span>
              </div>
              <div className="chat" onClick={contactSeller}>
                联系卖家
              </div>
              <Link to={"/orderPage/" + good?.id}>
                <div className="buy">购买</div>
              </Link>
            </Fragment>
          )}
          <div className="goods_info">
            <div className="title_desc">商品描述</div>
            <div className="desc">{good?.desc}</div>
          </div>
        </div>
      </div>
      <div className="similer_goods">
        <div className="title">相关产品</div>
        <div className="similer_box">
          {conGoods.map((item, index) => {
            return (
              <Product
                key={item.id}
                imageClassName="img2"
                img={item.images.split(",")[0]}
                title={item.title}
                price={item.price}
                userName={item.user.nickname}
                avatar={item.user.avatar}
                collection={true}
                goodId={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoodsDetail;
