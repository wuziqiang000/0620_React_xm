// 左侧导航
// 第三方文件
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


// 自定义文件
import './index.less'
import logo from '../../../assets/images/logo.png'
// menu菜单数据结构
import menuList from '../../../config/menu-config'
//获取标题
import { setHeaderTitle } from '../../../redux/action-creators/header-title'


const { SubMenu, Item } = Menu

// 保存获取的菜单标题值
@connect(state => ({headerTitle: state.headerTitle}), {setHeaderTitle})
// 处理非路由组件，使其可以得到身上的location
@withRouter

class LeftNav extends Component {

  // 方法二：使用reduce方法（累计）+递归调用
  getMenuNodes_reduce = (menuList) => {
    //返回生成menu标签
    // 传两个参数：第一个为上一个值，第二个为初始值
    return menuList.reduce((pre,item) => {

      // 拿到当前的请求路径:用于与二级菜单对应
      const path =this.props.location.pathname

      // 如果只有一级菜单，则生成<Item>,并向pre中添加
      // 即在menu配置结构对象中，没有children
      if (!item.children) {
        // 保存当前的标题到state中
        // 配置结构中的key与 当前path相同并且当前的标题不相同时，则保存到state中
        if (item.key === path && this.props.headerTitle!==item.title) {
          this.props.setHeaderTitle(item.title)
        }


        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      }else{

        // 对SubMenu中的children的key与path是否相等
        // 相等,则代表当前请求的是该二级菜单
        if (item.children.some(item => item.key === path)) {
          this.openKey = item.key
        }
        // 有二级菜单，生成<SubMenu>，并向pre中添加
        // 即在menu配置结构对象中，有children
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
      }
      // 必须返回累积的结果
      return pre

    },[])

  }

  // 方法一：使用map方法（遍历）+递归调用
  getMenuNodes = (menuList) => {
    // 返回生成menu标签
    return menuList.map(item =>{
      // 如果只有一级菜单，则生成<Item>，并返回标签
      // 即在menu配置结构对象中，没有children
      if (!item.children) {
        return (
          <Item key={item.key}>
            {/* 点击时切换标题 */}
            <Link to={item.key}  onClick={() => this.props.setHeaderTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      }else{
        // 有二级菜单，生成<SubMenu>
        // 即在menu配置结构对象中，有children
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
      }
    })
  }

  render() {
    const menuNodes = this.getMenuNodes_reduce(menuList)
    // 设置默认选中的菜单
    const selectedKey = this.props.location.pathname
    // 设置默认打开的二级菜单
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <div className="left-nav-header">
          <img src={logo} alt=""/>
          <h1>硅谷后台</h1>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          {menuNodes}
          {/* {this.getMenuNodes_reduce(menuList)} */}
          {/* {this.getMenuNodes(menuList)} */}
        </Menu>

        {/*这种写法只能是固定的几项，若要创建新的标签，需要在这里添加，因此，要动态添加*/}
        {/* <Menu
          mode="inline"
          theme="dark"
        >
          <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pic-left" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="border-outer" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu>
        </Menu> */}
      </div>
    )
  }
}

export default LeftNav
