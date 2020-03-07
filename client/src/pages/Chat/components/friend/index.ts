import Friends from "./view";

export default Friends;

export interface IProps {
  checked?: boolean; // 是否选中
  nickname: string; // 昵称
  avatar: string; // 头像
  lastText: string | null; // 最后的信息
  lastTime: number | null; // 最后发送记录
}
