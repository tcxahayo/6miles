import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Goods from "@/pages/Goods";
import { getCategory, ICategort } from "./apis";
import "../../style/iconfont.scss";
import "./view.scss";

const Home: React.FC = () => {
  const [overlay, setOverlay] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategort[]>([]);

  useEffect(function() {
    getCategory().then(res => {
      setCategory(res);
    });
  }, []);

  //定位
  useEffect(() => {
    AMap.plugin("AMap.CitySearch", function() {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status: any, result: any) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          console.log(result);
        }
      });
    });
  }, []);

  return (
    <div className="home_container">
      <div className="left">
        <ul className="category">
          {category.map(item => {
            return (
              <li
                className="item"
                key={item.id}
                onMouseLeave={() => setOverlay(false)}
                onMouseEnter={() => setOverlay(true)}
              >
                <div className="titleBox">
                  <div className="titleLeft">
                    <i className="iconfont icon">&#xe7a5;</i>
                    <h4 className="title">{item.title}</h4>
                  </div>
                  <i className="iconfont icon iconArrow">&#xe600;</i>
                </div>
                <ul className="wrapper">
                  {item.children.map(item => {
                    return <li key={item.id}>{item.title}</li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`right ${overlay ? "overlay" : ""}`}>
        <Route component={Goods} />
      </div>
    </div>
  );
};

export default Home;
