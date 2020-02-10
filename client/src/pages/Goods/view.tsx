import React, { useState, useEffect } from 'react';
import useQuery from '@/Hooks/useQuery';
import './view.scss';
import bg1 from "../../imges/dash3.jpg";
import Product from '@/components/Goods';
import Masonry from 'react-masonry-component';
import { Carousel } from 'antd';



const Goods: React.FC = () => {
  const query = useQuery();
  const key = query.get('key');


  return (
    <div className="goods_container">
      <div>
        <Carousel autoplay>
           <img src={bg1} alt="轮播图1" className="bg1" />
           <img src={bg1} alt="轮播图1" className="bg1" />
        </Carousel>
      </div>

      <Masonry>
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=141&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.opxQknlPxAYvWSy4RQw8nwHaFC&w=156&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
        <Product
          img="https://tse1-mm.cn.bing.net/th?id=OIP.BX8LJipOhUSQQx8GCCplWQHaIM&w=96&h=106&c=8&rs=1&qlt=90&pid=3.1&rm=2"
        />
      </Masonry>
    </div>

  )
}

export default Goods;
