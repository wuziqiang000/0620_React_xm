/* 
入口js
*/
// 第三方库
import React from 'react'
import ReactDOM from 'react-dom'
// 对状态进行统一管理
import {Provider} from 'react-redux'


// 自定义文件
import App from './App'
import store from './redux/store'


ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
  ),document.getElementById('root'))