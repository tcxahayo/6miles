import React, { useState, useEffect, FormEvent } from 'react';
import { Menu, Button, Avatar } from 'antd';
import { MessageOutlined, SearchOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { throttling } from '@/lib/loadsh';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/store';
import { actions } from '@/pages/App/store';
import im from '@/lib/Im';
import { clearToken } from '@/lib/app';
import logo1 from '../../imges/logo1.png';
import small from '../../imges/small.jpg';
import '../../style/iconfont.scss';
import './view.scss';


const Header: React.FC = () => {
  const userInfo = useSelector((state: State) => state.app.userInfo);
  const dispatch = useDispatch();
  const [scrollIsTop, setScrollIsTop] = useState(true);
  const [value, setValue] = useState('');
  const history = useHistory();
  const [city, setCity] = useState();

  function search(e: FormEvent) {
    e.preventDefault()
    value ? history.push(`/?key=${value}`) : history.push(`/`);

  }

  useEffect(() => {
    const onScroll = throttling(function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop <= 10) {
        setScrollIsTop(true)
      } else {
        setScrollIsTop(false)
      }
    }, 200);

    // 页面滚动事件
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [])

  //点击退出登录
  function longinOut() {
    clearToken();
    dispatch(actions.setUserInfo(null));
    im.signout();
    history.push('/');
  }
  //定位
  useEffect(() => {
    AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status: any, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          const city = result.province + result.city;
          setCity(city)
          console.log(result)
        }
      })
    })
  }, [])
  // 未登陆菜单
  function LoginMenu() {
    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[]}>
        <Menu.Item className="item">
          <Link to="/login">登陆</Link>
        </Menu.Item>
      </Menu>
    )
  }
  // 已登陆菜单
  function LoginedMenu() {
    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[]}>
        <Menu.Item className="item">
          <Link to="/chat" className="submenu-title-wrapper">
            <MessageOutlined className="icon" /> 消息
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          className="item"
          title={
            <span className="submenu-title-wrapper">
              <Avatar className="avatar" shape="circle" src={userInfo.avatar ? userInfo.avatar : small} />
              {userInfo.nickname}
            </span>
          }
        >
          <Menu.Item>
            <Link to="/profile">个人中心</Link>
          </Menu.Item>
          <Menu.Item onClick={longinOut}>退出登陆</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }

  return (
    <div className="c_header_container" style={scrollIsTop ? {} : { boxShadow: '0 2px 4px rgba(0,0,0,.25)' }}>
      <div className="row">
        <Link to="/" className="logo">
          <img className="logoImg" src={logo1} alt="" />
        </Link>
        <form className="search" onSubmit={search}>
          <div className="left">
            <label htmlFor="search-input">
              <SearchOutlined className="icon" />
            </label>
            <input
              id="search-input"
              className="input"
              value={value}
              onChange={(e: FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
              placeholder="Search..."
            />
          </div>
          <div className="right">
            <i className="iconfont address">&#xe629;</i>
            <span className="location">{city}</span>
          </div>
          <Button className="btn" htmlType="submit" shape="round" type="primary">Go</Button>
        </form>
        <div className="right">
          <Link to='/release'>
            <Button className="btn" shape="round" type="primary" icon={<NotificationOutlined />}>List It</Button>
          </Link>
          {userInfo ? <LoginedMenu /> : <LoginMenu />}
        </div>
      </div>
    </div>
  );
}

export default Header;
