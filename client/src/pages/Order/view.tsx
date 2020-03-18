import React, { Fragment, useState, useEffect } from "react";
import "./view.scss";
import { getOrderList, IOrder, cancelOrder } from "./api";
import "../../style/iconfont.scss";
import { Link, useHistory } from "react-router-dom";
import { Modal, message } from "antd";
import zhiImg from "@/imges/zhi.png";
import chatImg from "@/imges/chat.png";
import { pay, Number } from "../OrderPage/api";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

interface Props {
  // getLength:Function,
  //子组件给父组件传值，两种方式
  getLength: (parm: number) => void;
}

const Order: React.FC<Props> = props => {
  const [all, setAll] = useState(true);
  const [unpay, setUnpady] = useState(false);
  const [paied, setPaied] = useState(false);
  const [list, setList] = useState<IOrder[]>([]);

  const [visible, setVisible] = useState(false);
  const [zhi, setZhi] = useState(true);
  const [chat, setChat] = useState(false);
  const [type, setType] = useState(1);
  const [number, setNumber] = useState<Number>();
  const [logistics, setLogistics] = useState(false);
  const history = useHistory();


  const handleOk = (e: any) => {
    setVisible(false);
    payMoney(number, type);
  };
  const handleOk2 = () => {
    setLogistics(false)
  }
  const handleCancel = (e: any) => {
    setVisible(false);
    error();
    setTimeout(() => {
      history.push("/profile");
    }, 2000);
  };
  //支付宝支付
  function changeZhi() {
    setZhi(true);
    setChat(false);
    setType(1);
  }
  //微信支付
  function changeChat() {
    setZhi(false);
    setChat(true);
    setType(2);
  }
  //支付接口
  async function payMoney(number: any, type: number) {
    const data = await pay({ number, type });
    if (data) {
      success();
      setTimeout(() => {
        history.push("/profile");
      }, 2000);
    }
  }

  //成功提示
  const success = () => {
    message.success("支付成功", 5);
  };
  //失败提示
  const error = () => {
    message.error("支付失败", 5);
  };

  //全部订单
  useEffect(() => {
    orderList();
  }, []);

  //订单列表
  async function orderList(status?: any) {
    const data = await getOrderList({ status });

    const newData = data.filter((item, index) => {
      return item.status !== 0
    })
    setList(newData);
    props.getLength(newData.length);
  }
  //点击全部订单
  function allOrder() {
    setAll(true);
    setUnpady(false);
    setPaied(false);
    orderList();
  }
  //点击未付款
  function unPay() {
    setAll(false);
    setUnpady(true);
    setPaied(false);
    orderList(1);
  }
  //已经付款
  function payOrder() {
    setAll(false);
    setUnpady(false);
    setPaied(true);
    orderList(2);
  }
  //点击付款
  function setPay(e: any) {
    setVisible(true);
    setNumber(e.target.dataset.id);
  }
  //点击查看物流
  function cheackLogisti() {
    setLogistics(true)
  }
  //取消订单
  function showConfirm(e: any) {
    const number = e.target.dataset.number;
    confirm({
      title: '确定删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除订单将不可恢复',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          cancel(number)
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() { },
    });
  }
  //取消订单接口
  async function cancel(parms: any) {
    const data = await cancelOrder(parms);
    if (data) {
      orderList();
      orderList(1);
    }
  }
  return (
    <Fragment>
      <div className="order_container">
        <Modal
          title="选择支付方式"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modelBox">
            <div className="left">
              <div className={`zhi ${zhi ? "active" : ""}`} onClick={changeZhi}>
                支付宝
              </div>
              <div
                className={`chat ${chat ? "active" : ""}`}
                onClick={changeChat}
              >
                微信
              </div>
            </div>
            <div className="code">
              {zhi && <img className="img" src={zhiImg} alt="" />}
              {chat && <img className="img" src={chatImg} alt="" />}
              <div style={{ textAlign: "center" }}>扫一扫</div>
            </div>
          </div>
        </Modal>
        <Modal
          title="物流"
          visible={logistics}
          onOk={handleOk2}
          closable={false}
        >
          <div className="modelBox2">
            <div className="one">
              <div className="companyName">物流公司:<span className="name">一家快递</span></div>
              <div className="orderNumber">运单号码：<span className="number">123456789</span></div>
            </div>
            <ul>
              <li>
                <span className="data">2020.1.20</span>
                <span className="time">16:56:43</span>
                <span className="txt">包裹正在等待揽收</span>
              </li>
              <li>
                <span className="data hidden">2020.1.20</span>
                <span className="time">23:27:10</span>
                <span className="txt">【深圳市】广东深圳公司龙岗区英泰集包分部 已揽收</span>
              </li>

              <li>
                <span className="data">2020.1.21</span>
                <span className="time">1:13:59</span>
                <span className="txt">【深圳市】已离开 广东深圳公司龙岗区英泰集包分部；发往 四川成都地区包</span>
              </li>
              <li>
                <span className="data hidden">2020.1.20</span>
                <span className="time">03:32:08</span>
                <span className="txt">【深圳市】已到达 广东深圳公司</span>
              </li>
              <li>
                <span className="data hidden">2020.1.20</span>
                <span className="time">03:39:08</span>
                <span className="txt">【深圳市】已离开 广东深圳公司；发往 四川成都分拨中心</span>
              </li>


              <li>
                <span className="data">2020.1.22</span>
                <span className="time">10:28:55</span>
                <span className="txt">【成都市】已到达 四川成都分拨中心</span>
              </li>
              <li>
                <span className="data hidden">2020.1.20</span>
                <span className="time">10:41:12</span>
                <span className="txt">【成都市】已离开 四川成都分拨中心；发往 四川成都武侯区南门一公司</span>
              </li>
              <li>
                <span className="data hidden">2020.1.20</span>
                <span className="time">14:06:55</span>
                <span className="txt">成都市】四川成都武侯区南门一公司派件员：张贵清 电话：18782048477 当前正在为您派件</span>
              </li>
            </ul>
          </div>
        </Modal>
        <div className="order_content">
          <div className="order_menu">
            <div
              className={`allOrder ${all ? "active" : ""}`}
              onClick={allOrder}
            >
              全部订单
            </div>
            <div className={`unpay ${unpay ? "active" : ""}`} onClick={unPay}>
              未付款
            </div>
            <div
              className={`paied ${paied ? "active" : ""}`}
              onClick={payOrder}
            >
              已付款
            </div>
          </div>
          <div className="content_detail">
            {(all &&
              list.length &&
              list.map((item, index) => {
                return (
                  <Fragment>
                    <div className="all_order" key={item.id}>
                      <div className="orderTop">
                        <div className="orderTime">
                          {item.createDate.substring(0, 10)}
                        </div>
                        <div className="orderNum">
                          <span className="orderTxt1">订单号: </span>
                          <span className="orderTxt2">{item.number}</span>
                        </div>
                      </div>
                      <div className="orderMid">
                        <div className="pImg">
                          <img
                            className="img1"
                            src={item.goods.images.split(",")[0]}
                            alt=""
                          />
                        </div>
                        <div className="pTitle">{item.goods.title}</div>
                        <div className="pPrice">￥{item.price}</div>
                        <div className="warn">举报违规</div>
                        <Link to={'/orderDetail/' + item.id} className="order_detail">
                          <div>订单详情</div>
                        </Link>
                        {item.status === 1 && (
                          <div className="opeator">
                            <div className="buy">付款</div>
                            <div className="cancel" onClick={showConfirm} data-number={item.number}>取消订单</div>
                          </div>
                        )}
                        {item.status === 2 && (
                          <div className="opeator">
                            <div className="buied">已付款</div>
                            <div className="check" onClick={cheackLogisti}>查看物流</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              })) ||
              (all && (
                <Fragment>
                  <Link to="/" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">空空如也~</div>
                  </Link>
                </Fragment>
              ))}
            {(unpay &&
              list.length &&
              list.map((item, index) => {
                return (
                  <Fragment>
                    <div className="all_order" key={item.id}>
                      <div className="orderTop">
                        <div className="orderTime">
                          {item.createDate.substring(0, 10)}
                        </div>
                        <div className="orderNum">
                          <span className="orderTxt1">订单号: </span>
                          <span className="orderTxt2">{item.number}</span>
                        </div>
                      </div>
                      <div className="orderMid">
                        <div className="pImg">
                          <img
                            className="img1"
                            src={item.goods.images.split(",")[0]}
                            alt=""
                          />
                        </div>
                        <div className="pTitle">{item.goods.title}</div>
                        <div className="pPrice">￥{item.price}</div>
                        <div className="warn">举报违规</div>
                        <Link to={'/orderDetail/' + item.id} className="order_detail">
                          <div>订单详情</div>
                        </Link>
                        {item.status === 1 && (
                          <div className="opeator">
                            <div
                              className="buy"
                              onClick={setPay}
                              data-id={item.number}
                            >
                              付款
                            </div>
                            <div className="cancel" onClick={showConfirm} data-number={item.number}>取消订单</div>
                          </div>
                        )}
                        {item.status === 2 && (
                          <div className="opeator">
                            <div className="buied">已付款</div>
                            <div className="check" onClick={cheackLogisti}>查看物流</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              })) ||
              (unpay && (
                <Fragment>
                  <Link to="/" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">空空如也~</div>
                  </Link>
                </Fragment>
              ))}
            {(paied &&
              list.length &&
              list.map((item, index) => {
                return (
                  <Fragment>
                    <div className="all_order" key={item.id}>
                      <div className="orderTop">
                        <div className="orderTime">
                          {item.createDate.substring(0, 10)}
                        </div>
                        <div className="orderNum">
                          <span className="orderTxt1">订单号: </span>
                          <span className="orderTxt2">{item.number}</span>
                        </div>
                      </div>
                      <div className="orderMid">
                        <div className="pImg">
                          <img
                            className="img1"
                            src={item.goods.images.split(",")[0]}
                            alt=""
                          />
                        </div>
                        <div className="pTitle">{item.goods.title}</div>
                        <div className="pPrice">￥{item.price}</div>
                        <div className="warn">举报违规</div>
                        <Link to={'/orderDetail/' + item.id} className="order_detail">
                          <div>订单详情</div>
                        </Link>
                        {item.status === 1 && (
                          <div className="opeator">
                            <div className="buy">付款</div>
                            <div className="cancel" onClick={showConfirm} data-number={item.number}>取消订单</div>
                          </div>
                        )}
                        {item.status === 2 && (
                          <div className="opeator">
                            <div className="buied">已付款</div>
                            <div className="check" onClick={cheackLogisti}>查看物流</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              })) ||
              (paied && (
                <Fragment>
                  <Link to="/" className="empty">
                    <i className="iconfont null">&#xe618;</i>
                    <div className="emptyInfo">空空如也~</div>
                  </Link>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
