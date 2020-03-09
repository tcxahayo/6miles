import React, { useState, useEffect } from 'react';
import useQuery from '@/Hooks/useQuery';
import bg1 from "../../imges/dash3.jpg";
import Product from '@/components/Goods';
import Masonry from 'react-masonry-component';
import { Carousel } from 'antd';
import { getGoods, IGoods } from './apis';
import './view.scss';

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
  },[])

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
                <Product
                  key={item.id}
                  img={item.images}
                  title={item.title}
                  price={item.price}
                  userName={item.user.nickname}
                  avatar={item.user.avatar}
                  goodId={item.id}
                  collection={item.collection}
                  index={index}
                  area={item.area}
                />
            )
          })
        }
      </Masonry>
    </div>

  )
}

export default Goods;
