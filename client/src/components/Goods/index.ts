import template from './view';
export default template;

export interface IProps {
  img: string;
  //？非必传，不带？是必传
  userName?: string;
  number?: number
}
