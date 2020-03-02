import React, { useState, useEffect } from 'react';
import useQuery from '@/Hooks/useQuery';
import './view.scss';
import bg1 from "../../imges/dash3.jpg";
import Product from '@/components/Goods';
import Masonry from 'react-masonry-component';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { getGoods, IGoods } from './apis'
import Item from 'antd/lib/list/Item';



const Goods: React.FC = () => {
  const query = useQuery();
  const key = query.get('key');
  const [goods, setGoods] = useState<IGoods[]>([])
  useEffect(function () {
    getGoods().then((res) => {
      res.map((item,index)=>{
       item.images = item.images.split(",")[0];
       return item
      })
      setGoods(res)
    })
  }, [])

  return (
    <div className="goods_container">
      <div>
        <Carousel autoplay>
          <img src={bg1} alt="轮播图1" className="bg1" />
          <img src={bg1} alt="轮播图1" className="bg1" />
        </Carousel>
      </div>

      <Masonry>
        {
          goods.map((item, index) => {
            return (
              <div >
                <Product
                  img={item.images}
                  title={item.title}
                  price={item.price}
                  userName={item.user.nickname}
                  avatar={item.user.avatar}
                  goodId={item.id}
                />
              </div>
            )
          })
        }
        <Link to="/GoodsDetail">
          <Product
            img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
            title="啊哈哈"
            price={23}
            userName="12"
            avatar="23"
          />
        </Link>
      </Masonry>
    </div>

  )
}

export default Goods;
