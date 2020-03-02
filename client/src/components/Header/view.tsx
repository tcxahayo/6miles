import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import { Menu, Button, Icon, Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { throttling } from '@/lib/loadsh';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/store';
import { actions } from '@/pages/App/store';
import './view.scss';
import logo1 from '../../imges/logo1.png';
import small from '../../imges/small.jpg';



const Header: React.FC = () => {
  const userInfo = useSelector((state: State) => state.app.userInfo);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [scrollIsTop, setScrollIsTop] = useState(true);
  const [value, setValue] = useState('');
  const history = useHistory();

  function search(e: FormEvent) {
    e.preventDefault()
    value ? history.push(`/?key=${value}`) : history.push(`/`)
  }
  useEffect(()=>{
    setIsLogin(true)
  },[userInfo])

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
  //登录注册
  function showLoginModal() {
    dispatch(actions.changeLoginModalAction());
  }

  function showRegisterModel() {
    dispatch(actions.changeRegisterModalAction())
  }
  //点击退出登录
  function longinOut() {
    localStorage.removeItem('token');
    dispatch(actions.setUserInfo(''));
  }
  // 未登陆菜单
  function LoginMenu() {
    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[]}>
        <Menu.Item className="item" onClick={showRegisterModel}>注册</Menu.Item>
        <Menu.Item className="item" onClick={showLoginModal}>登陆</Menu.Item>
      </Menu>
    )
  }
  // 已登陆菜单
  function LoginedMenu() {
    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[]}>
        <Menu.Item className="item">
          <span className="submenu-title-wrapper">
            <Icon className="icon" type="message" />消息
          </span>
        </Menu.Item>
        <Menu.SubMenu
          className="item"
          title={
            <span className="submenu-title-wrapper">
              <Avatar className="avatar" shape="circle" src={userInfo.avatar? userInfo.avatar:small} />
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
          <img className="logoImg" src={logo1} alt=""/>
        </Link>
        <form className="search" onSubmit={search}>
          <div className="left">
            <label htmlFor="search-input">
              <Icon className="icon" type="search" />
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
            <Icon className="icon" type="search" />
            <span className="location">常州,中国常州,中国常州,中国</span>
          </div>
          <Button className="btn" htmlType="submit" shape="round" type="primary">Go</Button>
        </form>
        <div className="right">
          <Link to='/release'>
          <Button className="btn" shape="round" type="primary" icon="notification">List It</Button>
          </Link>
          {userInfo ? <LoginedMenu /> : <LoginMenu />}
        </div>
      </div>
    </div>
  );
}

export default Header;
