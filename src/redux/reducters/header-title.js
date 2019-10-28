/* 
管理header-title数据的reducer函数
*/
import { SET_HEADER_TITLE } from '../action-types'

// 默认为首页
const initHeaderTitle = '首页'
export default function headerTitle(state=initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
    return action.data
    default:
      return state
  }
}