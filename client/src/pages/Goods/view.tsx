import React, { useState, useEffect } from 'react';
import useQuery from '@/Hooks/useQuery';
import bg1 from "../../imges/dash3.jpg";
import Product from '@/components/Goods';
import Masonry from 'react-masonry-component';
import { Carousel } from 'antd';
import { getGoods, IList } from './apis';
import './view.scss';
import {useLocation} from "react-router-dom";

interface Parms{
  page:Number,
  size:Number,
  keyword?:string,
  categoryId?:string
}

const Goods: React.FC = () => {
  const query = useQuery();
  let location = useLocation();
  const key = query.get('key');
  const [goods, setGoods] = useState<IList[]>([]);
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [isContiue, setContiue] = useState(false);


  function list(data: any) {
    getGoods(data).then((res) => {
      if (res.list.length !== 0) {
        res.list.map((item, index) => {
          item.images = item.images.split(",")[0];
          return item
        })
        setGoods((goods)=>{
          return goods.concat(res.list)
        });
        setContiue(true);
        setEnd(false);
      } else {
        setEnd(true);
        setContiue(false);
      }
    })
  }
  useEffect(()=>{
    setGoods([]);
    setPage(1);
  },[key])
  useEffect(()=>{
    setGoods([]);
    setPage(1);
  },[location])
  useEffect(() => {
    let data:Parms = {
      page:page,
      size:10
    }
    if(key){
      data.keyword = key
    }
    if(location.state && location.state.id){
      data.categoryId = location.state.id
    }
    list(data)
  }, [page , key, location])

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
