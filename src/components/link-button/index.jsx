// 退出登录按钮路由

// 第三方文件
import React from 'react'

// 自定义文件
// 退出按钮样式
import './index.less'

function LinkButton (props) {
  /* 将接收到所有属性都传给button */
  return <button className="link-button" {...props}/>
}

export default LinkButton