import config from './ImConfig';
import store from '@/store';
import {actions} from '@/pages/Chat/store';
let WebIM = require('easemob-websdk') as any;
WebIM.config = config;

interface ChatLog {
  imUserId: string; // im用户id
  text: string; // 文本信息
  time: number; // 发送时间
}
interface Session {
  avatar: string; // 头像
  myImUserId?: string; // 个人id
  toImUserId: string; // 接收人im用户id
  nickname: string; // 昵称
  lastTime: number | null; // 最后发送时间
  lastText: string | null; // 最后发送的信息
  chatLog: ChatLog[]; // 聊天记录
}

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
        // 获取会话列表
        im.getFriends();
      },         //连接成功回调
      onClosed: (message: any) => { },         //连接关闭回调
      onTextMessage: (message: any) => { },    //收到文本消息
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
   * 获取临时会话
   */
  public getFriends() {
    const allSessionList = localStorage.getItem('imSessionList') || '[]';
    const allSession = JSON.parse(allSessionList) as Session[];
    const myImUserId = store.getState().app.userInfo.phone;
    const session = allSession.filter(item => item.myImUserId === myImUserId);
    store.dispatch(actions.setChatList(session));
    return session;
  }

  /**
   * 添加临时会话
   * @param userid
   */
  public setFriends(s: Session) {
    const allSessionList = localStorage.getItem('imSessionList') || '[]';
    const allSession = JSON.parse(allSessionList) as Session[];
    const myImUserId = store.getState().app.userInfo.phone;
    const session = allSession.filter(item => item.myImUserId === myImUserId);
    for(const i in session) {
      if (session[i].toImUserId === s.toImUserId) {
        return;
      }
    }
    s.myImUserId = myImUserId;
    session.unshift(s);
    localStorage.setItem('imSessionList', JSON.stringify(session));
    this.getFriends();
  }

  /**
   * 发送文本消息
   * @param to 接收对象
   * @param msg 消息内容
   */
  public sendMsg(to: string, msg: string) {
    const id = this.conn.getUniqueId();
    const message = new WebIM.default.message('txt', id);
    message.set({
      msg: msg,                  // 消息内容
      to: to,                          // 接收消息对象（用户id）
      roomType: false,
      success: (id: any, serverMsgId: any) => {
        console.log('send private text Success');
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
