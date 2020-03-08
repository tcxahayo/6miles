import config from './ImConfig';
import {actions} from '@/pages/Chat/store';
import store from '@/store';
let WebIM = require('easemob-websdk') as any;
WebIM.config = config;


/**
 * 单例模式
 */
class IM {

  private static im: IM;

  private constructor() {
    this.init();
  }

  public static getInstance() {
    if (this.im === undefined) {
      this.im = new IM();
    }
    return this.im;
  }

  private conn: any;

  // 初始化im
  private init() {
    let conn = WebIM.conn = new WebIM.default.connection({
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
    });
    conn.listen({
      onOpened: (message: any) => {
        // 登陆成功，获取会话列表
        im.getFriends();
      },
      onClosed: (message: any) => { },
      onTextMessage: (message: any) => {
        const avatar = message.ext.avatar || '';
        const nickname = message.ext.nickname || message.from;
        // 加入会话列表
        store.dispatch(actions.putChatItem({
          id: `${message.to}#${message.from}`,
          avatar,
          nickname,
          chatLog: []
        }))
        // 保存信息
        store.dispatch(actions.putMessage({
          sessionId: `${message.to}#${message.from}`,
          from: message.from,
          text: message.data,
          time: Number(message.time)
        }))
      }
    });

    this.conn = conn;
  }

  /**
   * 注册
   * @param username 用户名
   * @param password 密码
   * @param nickname 昵称
   */
  public register(username: string, password: string, nickname: string) {
    const options = {
      username,
      password,
      nickname,
      appKey: WebIM.config.appkey,
      success: function () { },
      error: function () { },
      apiUrl: WebIM.config.apiURL
    };
    this.conn.registerUser(options);
  }

  /**
   * 登陆
   * @param username 用户名
   * @param password 密码
   */
  public login(username: string, password: string) {
    var options = {
      apiUrl: WebIM.config.apiURL,
      user: username,
      pwd: password,
      appKey: WebIM.config.appkey
    };
    this.conn.open(options);
  }

  /**
   * 退出登陆
   */
  public signout() {
    this.conn.close();
  }

  /**
   * 从本地读取临时会话
   */
  public getFriends() {
    const key = store.getState().app.userInfo.phone;
    const allSessionList = localStorage.getItem(key) || '[]';
    const allSession = JSON.parse(allSessionList) as any[];
    store.dispatch(actions.setChatList(allSession));
  }

  /**
   * 保存到本地临时会话
   * @param allSession 会话列表
   */
  public setFirends(key: string, allSession: any) {
    localStorage.setItem(key ,JSON.stringify(allSession))
  }

  /**
   * 发送文本消息
   * @param to 接收对象
   * @param msg 消息内容
   */
  public sendMsg(to: string, msg: string) {
    const id = this.conn.getUniqueId();
    console.log(id)
    const message = new WebIM.default.message('txt', id);
    const userInfo = store.getState().app.userInfo
    message.set({
      msg: msg,                  // 消息内容
      to: to,                          // 接收消息对象（用户id）
      roomType: false,
      ext: {
        avatar: userInfo.avatar, // 将用户头像当作扩展消息发送
        nickname: userInfo.nickname
      },
      success: (id: any, serverMsgId: any) => {
        console.log('send private text Success');
        const option = { // 发送成功，将消息保存到redux中
          sessionId: `${userInfo.phone}#${to}`,
          from: userInfo.phone,
          text: msg,
          time: Date.now()
        }
        store.dispatch(actions.putMessage(option));
      },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: (e: any) => {
        console.log(e);
        console.log("Send private text error");
      }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    });
    this.conn.send(message.body);
  }
}
const im = IM.getInstance();
export default im
