/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
// 引入核心对象：
import store from './redux/store'

// 绑定监听
// store上的方法：当状态发生变化时，再次渲染页面
store.subscrbe(()=>{
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})
