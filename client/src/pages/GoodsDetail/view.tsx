import React from 'react';
import './view.scss';
import '../../style/iconfont.scss';

const GoodsDetail: React.FC = () => {
  return (
    <div className="detail_container">
      <div className="goods">
        <div className="goods_left">
          <div className="imgBox">
            <div className="img">
              <img src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1200x500.jpg" alt="" />
            </div>
            <div className="imgIndex">
              <img src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1200x500.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="goods_right">
          <div className="goods_title">《液晶显示器件制造知识管理与创新服务平台》面向液晶显示器件制造单位</div>
          <div className="goods_price">
            <i className="iconfont icno-price">&#xe610;</i>
            <span className="price_num">1234</span>
          </div>
          <div className="goods_address">
            <i className="iconfont icno-address">&#xe629;</i>
            <span className="address_info">四川-成都-锦江区</span>
          </div>
          <div className="add_collection">
            <i className="iconfont icno-collection">&#xe614;</i>
            <span className="collection_txt">收藏</span>
          </div>
          <div className="chat">联系卖家</div>
          <div className="buy">购买</div>
          <div className="goods_info">
            <div className="desc">是一个专业、
            权威、海量、时效的知识服务平台。
            平台以知识服务为目标，对资源进行深度整合和系统化构建，
            内容涵盖国内外最新行业发展、产业动态、液晶显示器件分类、
            制造原材料、制造设备、制造工艺流程、质量控制、应用领域、
            运营管理等知识，实现了海量数据的科学收录和快速检索，
            促进行业知识共享，是一个内容全面权威的液晶显示器件制造专业知识服务系统。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoodsDetail;
