import React, { Fragment, useEffect, useState } from "react";
import { Cascader, Input, message, Modal } from "antd";
import city from "@/components/CitySelect/data";
import { conectGoods,Details } from "../GoodsDetail/api";
import { useParams, useHistory } from "react-router-dom";
import { subOrder, pay, Number } from "./api";
import zhiImg from "@/imges/zhi.png";
import chatImg from "@/imges/chat.png";
import "./view.scss";

const { TextArea } = Input;
interface Form {
  address: string;
  goodsId: string;
  name: string;
  phone: string;
  price: number;
  remark: string;
}

const OrderPage: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const option = city;
  const [good, setGood] = useState<Details>();
  const [img, setImg] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [main, setMain] = useState<string>();
  const [form, setForm] = useState<Form>();
  const [visible, setVisible] = useState(false);
  const [zhi, setZhi] = useState(true);
  const [chat, setChat] = useState(false);
  const [type, setType] = useState(1);
  const [number, setNumber] = useState<Number>();

  const handleOk = (e: any) => {
    setVisible(false);
    payMoney(number, type);
  };
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

  //商品详情
  useEffect(() => {
    async function detail(id: any) {
      const data = await conectGoods(id);
      if (data) {
        const img1 = data.details.images.split(',')[0];
        setImg(img1);
        setGood(data.details);
      }
    }
    detail(id);
  }, [id]);

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
  //获取地址
  function getAddress(value: any, label: any) {
    const lab = label.map((item: any, index: any) => {
      const data1 = [];
      data1.push(item.label);
      return data1;
    });
    setAddress(lab.join(""));
  }
  //获取输入信息
  function getValue(e: any) {
    const value = e.target.value;

    switch (e.target.name) {
      case "mainAdd":
        setMain(value);
        break;
      case "name":
        setForm(Object.assign({}, form, { name: value }));
        break;
      case "phone":
          setForm(Object.assign({}, form, { phone: value }));
        break;
      case "mark":
        setForm(Object.assign({}, form, { remark: value }));
    }
  }
  //提交接口
  async function submitOrder(argum: any) {
    const data = await subOrder(argum);
    if (data) {
      setVisible(true);
      setNumber(data);
    }
  }
  //点击提交
  function submit() {
    if(form?.phone && form?.name && main && address){
      submitOrder(
        Object.assign(form, {
          goodsId: good?.id,
          price: good?.price,
          address: address + main
        })
      )
    }else{
      console.log(form)
      message.error('请输入完整信息')
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

  function demo() {
    console.log(form);
    setTimeout(() => {
      history.push("/profile");
    }, 2000);
  }
  return (
    <Fragment>
      <div className="orderPage_container">
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

        <div className="order_content">
          <div className="top" onClick={demo}>
            确认订单信息：
          </div>
          <div className="menuItem">
            <div className="item1">宝贝</div>
            <div className="item2">名称</div>
            <div className="item3">价格</div>
          </div>
          <div className="main_content">
            <div className="seller">
              <i className="iconfont icno">&#xe687;</i>
              <div className="sell_info">卖家： {good?.user.nickname}</div>
              <i className="iconfont icno2">&#xe604;</i>
            </div>
            <div className="goods_detail">
              <img className="goods_img" src={img} alt="" />
              <div className="goods_title">{good?.title}</div>
              <div className="goods_price">￥{good?.price}</div>
            </div>
            <div className="address_content">
              <div className="address">
                <div className="address_top">收货信息：</div>
                <div className="address_main">
                  <div className="address_main_one">收货地址：</div>
                  <Cascader
                    onChange={getAddress}
                    options={option}
                    className="city"
                    placeholder="选择城市"
                  />
                  <div className="address_main_two">详细地址：</div>
                  <Input
                    className="address_main_three"
                    name="mainAdd"
                    onChange={getValue}
                    placeholder="详细地址：街道门牌号"
                  />
                </div>
                <div className="user_info">
                  <div className="user_name">收件人姓名：</div>
                  <Input
                    className="input_name"
                    name="name"
                    onChange={getValue}
                    placeholder="收件人姓名"
                  />
                  <div className="user_phone">联系方式：</div>
                  <Input
                    className="input_phone"
                    name="phone"
                    onChange={getValue}
                    placeholder="联系人方式"
                  />
                </div>
              </div>
              <div className="delivery">
                <div className="message">
                  <div className="message_one">给卖家留言：</div>
                  <TextArea
                    rows={2}
                    name="mark"
                    onChange={getValue}
                    placeholder="选填，请先和商家协商一致！"
                  />
                </div>
                <div className="postage">
                  <div className="post_way">运送方式： 普通配送快递 免邮</div>
                  <div className="post_price">0.00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="submit">
            <div className="sub_price">
              实付款：<span className="sub_syb">￥</span>
              <span className="sub_mun">{good?.price}</span>
            </div>
            <div className="btu" onClick={submit}>
              提交订单
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderPage;
