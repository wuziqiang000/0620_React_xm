/**
 * 向外暴露一个统一的reducter（管理者所有的reducter）
 */
// 第三方文件
import { combineReducers } from 'redux'


// 自定义文件
import user from './user'
import headerTitle from './header-title'

export default combineReducers({
  user,
  headerTitle
})