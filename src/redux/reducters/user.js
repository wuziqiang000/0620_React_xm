/**
 * 管理用户登录数据的reducter
 */
// 常量
 import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from '../action-types'
 import storage from '../../utils/storage'


// const _user = JSON.parse(localStorage.getItem('user_key') || '{}')
// const _token = localStorage.getItem('token_key')
const _user = storage.get(storage.KEYS.USER_KEY,{})
const _token = storage.get(storage.KEYS.TOKEN_KEY,'')

const initUser = { // 初始值
  user: _user,//用户信息：username和password
  token: _token,//token值：免登录用
  hasLogin: _token && _user._id // 是否已经登陆
}


export default function user(state=initUser, action) {
  switch (action.type) {
    // 当参数类型为SAVE_USER_TOKEN时，保存数据，登录状态
    case SAVE_USER_TOKEN:
      const { user, token } = action.data
      return {
        user, 
        token,
        hasLogin: true
      }
      //当参数类型为REMOVE_USER_TOKEN时，移除数据，未登录状态
    case REMOVE_USER_TOKEN:
      return {
        user: {}, 
        token: '',
        hasLogin: false
      }
    default:
      return state
  }
}