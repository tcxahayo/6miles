import React from 'react';
import webimConfig from '@/config/webim';
import {Button} from 'antd';
import './view.scss';


const WebIM = require('easemob-websdk') as any;

WebIM.config = webimConfig;
const conn = WebIM.conn = new WebIM.default.connection({
  appKey: WebIM.config.appkey,
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: WebIM.config.isAutoLogin,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery
})
console.log(webimConfig)
conn.listen({
  onOpened: (message: any) => {          //连接成功回调
      // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
      // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
      // 则无需调用conn.setPresence();
      console.log('连接成功');
  },
  onClosed: (message: any) => {
    console.log('关闭连接');
  },         //连接关闭回调
  onTextMessage: (message: any) => {
    console.log("收到文本消息：")
    console.log(message)
  },    //收到文本消息
  onEmojiMessage: (message: any) => {},   //收到表情消息
  onPictureMessage: (message: any) => {}, //收到图片消息
  onPresence: (message: any) => {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onRoster: (message: any) => {},         //处理好友申请
  onInviteMessage: (message: any) => {},  //处理群组邀请
  onOnline: function () {},                  //本机网络连接成功
  onOffline: function () {},                 //本机网络掉线
  onError: (message: any) => {},          //失败回调
  onRecallMessage: (message: any) => {},      //收到撤回消息回调
  onReceivedMessage: (message: any) => {
    console.log(message)
    console.log('成功')
  },    //收到消息送达服务器回执
  onDeliveredMessage: (message: any) => {},   //收到消息送达客户端回执
  onReadMessage: (message: any) => {},        //收到消息已读回执
  onCreateGroup: (message: any) => {},        //创建群组成功回执（需调用createGroupNew）
  onMutedMessage: (message: any) => {}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});



const Chat: React.FC = () => {
  function register() {
    const options = {
      username: 'admin2',
      password: 'admin2',
      nickname: 'admin2',
      appKey: webimConfig.appkey,
      success: function () {
        console.log(arguments)
        console.log('注册成功')
      },
      error: function () {
        console.log(arguments)
        console.log('注册失败')
      },
      apiUrl: webimConfig.apiURL
    };
    conn.registerUser(options);
  }
  function login() {
    const options = {
      apiUrl: webimConfig.apiURL,
      user: 'admin',
      pwd: 'admin',
      success: function () {
        console.log(arguments)
        console.log('登陆成功')
      },
      error: function () {
        console.log(arguments)
        console.log('登陆失败')
      },
      appKey: webimConfig.appkey
    };
    conn.open(options);
  }
  function sendText() {
    const id = conn.getUniqueId();                 // 生成本地消息id
    const msg = new WebIM.default.message('txt', id);      // 创建文本消息
    console.log(conn)
    msg.set({
      msg: 'hello word',                  // 消息内容
      to: 'admin',                          // 接收消息对象（用户id）
      rootType: true,
      success: function (id: any, serverMsgId: any) {
        console.log('send private text Success');
      },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: function(e: any){
        console.log(e)
        console.log("Send private text error");
      }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    });
    conn.send(msg.body);
  }
  return (
    <div className="chat_container">
      <Button onClick={register}>注册</Button>
      <Button onClick={login}>登陆</Button>
      <Button onClick={sendText}>发送文本消息</Button>
    </div>
  )
}

export default Chat;
