import React, { useState, useEffect } from 'react';
import useQuery from '@/Hooks/useQuery';
import bg1 from "../../imges/dash3.jpg";
import Product from '@/components/Goods';
import Masonry from 'react-masonry-component';
import { Carousel } from 'antd';
import { getGoods, IGoods, IList } from './apis';
import { Spin, message } from 'antd';
import './view.scss';

const Goods: React.FC = () => {
  const query = useQuery();
  const key = query.get('key');
  const [goods, setGoods] = useState<IList[]>([]);
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [isContiue, setContiue] = useState(false);

  console.log(key)
  function list(data: any) {
    getGoods(data).then((res) => {
      if (res.list.length != 0) {
        res.list.map((item, index) => {
          item.images = item.images.split(",")[0];
          return item
        })
        setGoods((goods)=>{
          return goods.concat(res.list)
        });
        setContiue(true)
      } else {
        setEnd(true);
        setContiue(false);
      }
    })
  }
  useEffect(()=>{
    setGoods([]);
    setPage(1)
  },[key])
  useEffect(() => {
    list({ page: page, size: 10, keyword: key })
  }, [page , key])

  function handScroll(event: any) {
    console.log("节流")
    // 滚动的高度
    const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
    // 视窗高度
    const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
    // 页面高度
    const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
    // 距离页面底部的高度
    const height = scrollHeight - scrollTop - clientHeight;

    if (height < 80 && !isEnd ) {
        setPage(t => t+1 )

    }
    console.log(height)
  }
  useEffect(() => {
    window.addEventListener('scroll', throttle(handScroll, 1000));
    return () => {
      window.removeEventListener('scroll', handScroll);
    }
  }, [])
  //节流
  function throttle(fun: any, delay: any) {
    var prev = Date.now();
    return function () {
      var args = arguments;
      var context = fun;
      var now = Date.now();
      if (now - prev >= delay) {
        fun.apply(context, args);
        prev = Date.now();
      }
    }
  }

  // window.addEventListener('scroll', handScroll)

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
      {
        isContiue && (
          <div className="more">
            下拉更多
          </div>
        )
      }
      {
        isEnd && (
          <div className="end">没有更多了</div>
        )
      }

    </div>

  )
}

export default Goods;
