import React, { useRef, useState, useEffect } from 'react';
import './view.scss';
import '../../style/iconfont.scss';
import { Carousel } from 'antd';
import Product from '@/components/Goods';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getDetail, Param } from './api';
import { actions } from '@/pages/Chat/store';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/store';

interface Params {
  id: string;
}

const GoodsDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const carousel = useRef<any>();
  const user = useSelector((state: State) => state.app.userInfo)
  const history = useHistory();
  const dispatch = useDispatch();
  const [collect, setCollect] = useState(false);
  const [good, setGood] = useState<Param>();
  const [img, setImg] = useState<string []>([]);

  useEffect(() => {
    (async function() {
      const data = await getDetail(id);
      if (data) {
        const imgs = data.images.split(',');
        setImg(imgs)
        setGood(data)
      }
    })()
  },[id])

  function changeCarousel(index: number) {
    carousel.current.goTo(index)
  }

  function contactSeller() {
    if (!good) return false;
    dispatch(actions.putChatItem({
      id: `${user.phone}#${good.user.phone}`,
      avatar: good.user.avatar,
      nickname: good.user.nickname,
      chatLog: []
    }))
    history.push('/chat');
  }

  function collection() {
    setCollect(!collect)
  }

  return (
    <div className="detail_container">
      <div className="goods">
        <div className="goods_left">
          <div className="imgBox">
            <Carousel ref={carousel}>
              {
                img.map((item:any,index:any)=>{
                  return(
                    <div className="img">
                    <img src={item} alt="" />
                  </div>
                  )
                })
              }
            </Carousel>
            <div className="imgIndex">
              {
                img.map((item,index)=>{
                  return(
                    <img onClick={() => { changeCarousel(index) }} src={item} alt="" />
                  )
                })
              }
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
          <div className="add_collection" onClick={collection}>
            <i className="iconfont icno-collection" style={collect ? { color: 'red' } : { color: '#fff' }}>&#xe614;</i>
            <span className="collection_txt" style={collect ? { color: 'red' } : { color: '#fff' }}>收藏</span>
          </div>
          <div className="chat" onClick={contactSeller}>联系卖家</div>
          <Link to={"/orderPage/" + good?.id}>
            <div className="buy">购买</div>
          </Link>
          <div className="goods_info">
            <div className="title_desc">商品描述</div>
            <div className="desc">{good?.desc}
            </div>
          </div>
        </div>
      </div>
      <div className="similer_goods">
        <div className="title">相关产品</div>
        <div className="similer_box">
          <Product
            imageClassName="img2"
            img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
            title="啊哈哈"
            price={23}
            userName="12"
            avatar="23"
            collection={true}
            index={123}
            goodId="123"
          />
          <Product
            imageClassName="img2"
            img="http://img15.3lian.com/2015/f1/87/d/49.jpg"
            title="啊哈哈"
            price={23}
            userName="12"
            avatar="23"
            collection={true}
            index={123}
            goodId="123"
          />
        </div>
      </div>
    </div>
  )
}

export default GoodsDetail;
