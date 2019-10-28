/**
 * 用于检测用户是否登陆的组件
 */
import React from "react";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function WithCheckLogin(WrappedComponent) {//WrappedComponent是被包装组件

  @connect(state => ({hasLogin: state.user.hasLogin}))
  class HocComponent extends React.Component{
    render (){
      // 拿到登录界面和用户界面的path及是否登陆的标识
      const path = this.props.location.pathname
      const { hasLogin,...rest} = this.props//...rest表示除hasLogin之外的其他属性
      // 判断是否已登录
      // 如果请求的是login, 但已经登陆, 自动跳转到admin
      if (path==='/login' && hasLogin) return <Redirect to="/"/> 
      // 如果请求的不是login, 但没有登陆, 自动跳转到login
      if (path!=='/login' && !hasLogin) return <Redirect to="/login"/> 
    
      return <WrappedComponent {...rest}/>
    }
  }
  
  // 返回一个新的组件
  return HocComponent
}