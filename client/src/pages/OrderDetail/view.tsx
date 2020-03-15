import React, { Fragment, useEffect, useState } from 'react';
import './view.scss';
import { CheckCircleTwoTone, CloseCircleFilled } from '@ant-design/icons';
import { useParams, useHistory } from "react-router-dom";
import { orderDetail, Params } from './api'
import { Modal, message } from "antd";
import { pay, Number } from '../OrderPage/api';
import zhiImg from "@/imges/zhi.png";
import chatImg from "@/imges/chat.png";

const OrderDetail: React.FC = () => {

  const history = useHistory();
  const { id } = useParams();
  const [order, setOrder] = useState<Params>();
  const [visible, setVisible] = useState(false);
  const [zhi, setZhi] = useState(true);
  const [chat, setChat] = useState(false);
  const [type, setType] = useState(1);
  const [number, setNumber] = useState<Number>();


  useEffect(() => {
    detail(id)
  }, [])

  async function detail(param: any) {
    const data = await orderDetail(param);
    setOrder(data)
  }
  const handleOk = (e: any) => {
    setVisible(false);
    payMoney(number, type);
  };
  const handleCancel = (e: any) => {
    setVisible(false);
    message.error('支付失败')
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
  //点击付款
  function setPay(e: any) {
    setVisible(true);
    setNumber(e.target.dataset.id);
    console.log(e.target.dataset.id)
  }
  //支付接口
  async function payMoney(number: any, type: number) {
    const data = await pay({ number, type });
    if (data) {
      setTimeout(() => {
        history.push("/profile");
      }, 2000);
      message.success('支付成功')
    }
  }

  return (
    <Fragment>
      <div className="orderDetail_container">
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
        <div className="content">
          <div className="title">订单详情:</div>
          <div className="orderDetail">
            <div className="orderLeft">
              <div className="orderInfo">订单信息</div>
              <div className="mainInfo">
                <div className="tip">收货地址：</div>
                <div className="txt">{order?.name},{order?.phone},{order?.address}</div>
              </div>
              <div className="mainInfo">
                <div className="tip">买家留言：</div>
                <div className="txt">{order?.remark}</div>
              </div>
              <div className="mainInfo">
                <div className="tip">订单编号：</div>
                <div className="txt">{order?.number}</div>
              </div>
              <div className="mainInfo">
                {
                  order?.status === 2 && (
                    <Fragment>
                      <div className="tip">支付时间：</div>
                      <div className="txt">{order?.updateDate}</div>
                    </Fragment>
                  ) || (
                    <Fragment>
                      <div className="tip">下单时间：</div>
                      <div className="txt">{order?.updateDate}</div>
                    </Fragment>
                  )
                }

              </div>
            </div>
            <div className="orderRight">
              {
                order?.status === 2 && (
                  <Fragment>
                    <div className="one">
                      <CheckCircleTwoTone className="icno1" />
                      <div className="stuta">订单状态：交易成功</div>
                    </div>
                    <div className="two">
                      <i className="icnofont"></i>
                      <div className="log">物流：</div>
                      <div className="logistic">韵达快递 运单号：1234567890</div>
                    </div>
                  </Fragment>
                ) || (
                  <Fragment>
                    <div className="one">
                      <CloseCircleFilled className="icno2" />
                      <div className="stuta">订单状态：<span className="pay" onClick={setPay} data-id={order?.number}>待支付</span></div>
                    </div>
                  </Fragment>
                )
              }
            </div>
          </div>
          <div className="goodDetail">
            <div className="meuns">
              <div className="tip1">宝贝</div>
              <div className="tip2">名称</div>
              <div className="tip3">单价</div>
              <div className="tip4">状态</div>
            </div>
            <div className="logistiInfo">
              <div className="serial">包邮</div>
              <div className="logCompany">韵达快递</div>
              <div className="logNum">1234567890</div>
            </div>
            <div className="goodInfo">
              <div className="img">
                <img className="img1" src={order?.goods.images.split(',')[0]} alt="" />
              </div>
              <div className="name">{order?.goods.title}</div>
              <div className="price">￥ {order?.goods.price}</div>
              {
                order?.status === 2 && (
                  <Fragment>
                    <div className="statu">交易成功</div>
                  </Fragment>
                ) || (
                  <Fragment>
                    <div className="statu">待支付</div>
                  </Fragment>
                )
              }

            </div>
            <div className="totle">
              <div className="tip1">商品总价： ￥ {order?.price}</div>
              <div className="tip2">运费： ￥ 0.00 &nbsp;</div>
              <div className="tip3">实付款： ￥ {order?.price}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderDetail;
