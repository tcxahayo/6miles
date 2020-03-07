import config from './ImConfig';
const WebIM = require('easemob-websdk') as any;
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
    let conn = WebIM.conn = new WebIM.default.connection(WebIM.config);
    conn.listen({
        onOpened: (message: any) => {
          console.log('上线成功')
        },         //连接成功回调
        onClosed: (message: any) => {},         //连接关闭回调
        onTextMessage: (message: any) => {},    //收到文本消息
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
   * 发送文本消息
   * @param to 接收对象
   * @param msg 消息内容
   */
  public sendMsg(to: string, msg: string) {
    const id = this.conn.getUniqueId();
    const message = new WebIM.message('txt', id);
    message.set({
      msg: msg,                  // 消息内容
      to: to,                          // 接收消息对象（用户id）
      roomType: false,
      success: (id: any, serverMsgId: any) => {
          console.log('send private text Success');
      },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: (e: any) => {
          console.log("Send private text error");
      }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    });
    this.conn.send(message.body);
  }
}

export default IM.getInstance();
