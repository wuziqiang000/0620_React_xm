// 右侧头部交互

// 第三方文件
import React, { Component } from 'react'
import {connect} from 'react-redux'
// 高阶组件, 用来包装非路由组件
import {withRouter} from 'react-router-dom'  
// 时间格式化
import dayjs from "dayjs";
// 用于退出登录的提示框
import { Modal,Button, Icon  } from 'antd'
// 用于处理全屏状态
import screenfull from 'screenfull'


// 自定义文件
// 退出按钮
import LinkButton from '../../../components/link-button'
// 退出按钮样式
import './index.less'
// 退出登录
import {removeUserToken} from '../../../redux/action-creators/user'
// 引入天气接口
import { reqWeather } from '../../../api'


@connect(
  state => ({
    username: state.user.user.username,
    // 保存获取的菜单标题值
    headerTitle:state.headerTitle
  }),
  {removeUserToken}
  )
@withRouter  // 向组件内部传入3个属性: history/location/match


class Header extends Component {


  state = {
    // 时间格式化
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    // 保存天气相关信息
    dayPictureUrl: '',
    weather: '',
    // 是否全屏
    isFullScreen: false
  }

  // 退出登录
  logout = () => {
    // 显示提示框
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        // 确认
        this.props.removeUserToken()
      },
      onCancel() {
        // 取消：可不填
        console.log('Cancel');
      },
    })
  }

  // 获取天气信息
  showWeather = async () => {
    // 请求数据
    const {dayPictureUrl, weather} = await reqWeather('北京')
    // 更新天气状态
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  // 全屏状态处理
  handleFullScreen = () => {
    if (screenfull.isEnabled) {
      // 全屏、非全屏切换
      screenfull.toggle()
    }
  }


  componentDidMount () {
    // 启动循环定时器, 每隔1s, 重新渲染页面并更新显示当前时间
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
    
    // 请求天气信息
    this.showWeather()

    // 全屏状态处理
//给screenfull绑定监听
  screenfull.onchange(()=>{
    // 改变状态
    this.setState({
      isFullScreen: !this.state.isFullScreen
      })
    })
  }

  componentWillUnmount () {
    // 下一次渲染页面之前，清除定时器
    clearInterval(this.intervalId)
  }


  render() {
    // // 得到当前请求的路由路径
    // const path = this.props.location.pathname
    // 得到当前时间
    const {currentTime,dayPictureUrl,weather,isFullScreen} = this.state
      // 得到username和headerTitle
    const { username,headerTitle} = this.props

    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
