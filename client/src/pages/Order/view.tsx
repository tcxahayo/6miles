import React, { Fragment, useState } from 'react';
import './view.scss';

const Order: React.FC = () => {
  const [all, setAll] = useState(true);
  const [unpay, setUnpady] = useState(false);
  const [paied, setPaied] = useState(false);
  //点击全部订单
  function allOrder() {
    setAll(true);
    setUnpady(false);
    setPaied(false);
  };
  //点击未付款
  function unPay() {
    setAll(false);
    setUnpady(true);
    setPaied(false);
  }
  //已经付款
  function payOrder() {
    setAll(false);
    setUnpady(false);
    setPaied(true);
  }
  return (
    <Fragment>
      <div className="order_container">
        <div className="order_content">
          <div className="order_menu">
            <div className={`allOrder ${all ? "active" : ''}`} onClick={allOrder}>全部订单</div>
            <div className={`unpay ${unpay ? "active" : ''}`} onClick={unPay}>未付款</div>
            <div className={`paied ${paied ? "active" : ''}`} onClick={payOrder}>已付款</div>
          </div>
          <div className="content_detail">
            {
              all && (
                <Fragment>
                  <div className="all_order">
                    <div className="orderTop">
                      <div className="orderTime">2020-2-24</div>
                      <div className="orderNum">
                        <span className="orderTxt1">订单号: </span>
                        <span className="orderTxt2">1234567890987654321</span>
                      </div>
                    </div>
                    <div className="orderMid">
                      <div className="pImg">
                        <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="" />
                      </div>
                      <div className="pTitle">溪岸橱柜定制整体现代简约开放式厨房厨柜定做全屋定制小厨房装修 [交易快照]</div>
                      <div className="pPrice">￥1234.00</div>
                      <div className="warn">举报违规</div>
                      <div className="order_detail">订单详情</div>
                      <div className="opeator">
                        <div className="buy">付款</div>
                        <div className="cancel">取消订单</div>
                      </div>
                      <div className="opeator" style={{ display: 'none' }}>
                        <div className="buied">已付款</div>
                      </div>
                    </div>
                  </div>

                  <div className="all_order">
                    <div className="orderTop">
                      <div className="orderTime">2020-2-20</div>
                      <div className="orderNum">
                        <span className="orderTxt1">订单号: </span>
                        <span className="orderTxt2">1234567890987654321</span>
                      </div>
                    </div>
                    <div className="orderMid">
                      <div className="pImg">
                        <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="" />
                      </div>
                      <div className="pTitle">溪岸橱柜定制整体现代简约开放式厨房厨柜定做全屋定制小厨房装修 [交易快照]</div>
                      <div className="pPrice">￥1234.00</div>
                      <div className="warn">举报违规</div>
                      <div className="order_detail">订单详情</div>
                      <div className="opeator" style={{ display: 'none' }}>
                        <div className="buy">付款</div>
                        <div className="cancel">取消订单</div>
                      </div>
                      <div className="opeator">
                        <div className="buied">已付款</div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            }
            {
              unpay && (
                <Fragment>
                  <div className="all_order">
                    <div className="orderTop">
                      <div className="orderTime">2020-2-24</div>
                      <div className="orderNum">
                        <span className="orderTxt1">订单号: </span>
                        <span className="orderTxt2">1234567890987654321</span>
                      </div>
                    </div>
                    <div className="orderMid">
                      <div className="pImg">
                        <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="" />
                      </div>
                      <div className="pTitle">溪岸橱柜定制整体现代简约开放式厨房厨柜定做全屋定制小厨房装修 [交易快照]</div>
                      <div className="pPrice">￥1234.00</div>
                      <div className="warn">举报违规</div>
                      <div className="order_detail">订单详情</div>
                      <div className="opeator">
                        <div className="buy">付款</div>
                        <div className="cancel">取消订单</div>
                      </div>
                      <div className="opeator" style={{ display: 'none' }}>
                        <div className="buied">已付款</div>
                      </div>
                    </div>
                  </div>

                </Fragment>
              )
            }
            {
              paied && (
                <Fragment>
                  <div className="all_order">
                    <div className="orderTop">
                      <div className="orderTime">2020-2-20</div>
                      <div className="orderNum">
                        <span className="orderTxt1">订单号: </span>
                        <span className="orderTxt2">1234567890987654321</span>
                      </div>
                      <div className="delete">
                        <i className="iconfont dele">&#xe628;</i>
                      </div>
                    </div>
                    <div className="orderMid">
                      <div className="pImg">
                        <img className="img1" src="https://img01.sogoucdn.com/app/a/07/57d9e1c69332c8da692c3ec5c0e1466b" alt="" />
                      </div>
                      <div className="pTitle">溪岸橱柜定制整体现代简约开放式厨房厨柜定做全屋定制小厨房装修 [交易快照]</div>
                      <div className="pPrice">￥1234.00</div>
                      <div className="warn">举报违规</div>
                      <div className="order_detail">订单详情</div>
                      <div className="opeator" style={{ display: 'none' }}>
                        <div className="buy">付款</div>
                        <div className="cancel">取消订单</div>
                      </div>
                      <div className="opeator">
                        <div className="buied">已付款</div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            }



          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Order;
