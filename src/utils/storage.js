/**
 * 封装local存储数据
 *      localStorage
 */
// 使用第三方包
import store from 'store'


//  保存数据:保存指定key及对应的value值
function set(key,value) {
  // 原生写法
  //localStorage.setItem(key,value instanceof Object ? JSON.stringify(value) : value)
  // 简单方法
  store.set(key,value)
}
// 获取数据:获取指定key对应的value值，没传key则返回默认值
function get(key,defaultValue) {
  // 原生写法
  // // 得到key对应的value
  // const value = localStorage.getItem(key)
  // // 判断：如果返回的数据为对象，进行转换;否则直接返回
  // if (defaultValue instanceof Object) {
  //   return JSON.parse(value) || defaultValue
  // }
  // return value || defaultValue

  // 简单写法
  // 当不传默认值时
  if (defaultValue === undefined) {
    throw new Error('必须传默认值')
  }
  // 注意return
  return store.get(key,defaultValue)
}

// 删除数据：删除指定key对应的信息
function remove(key) {
  // 原生写法
  // localStorage.removeItem(key)
  // 简单写法
  // 如果不传key，则代表删除所有
  if (key) {
    store.remove(key)
  }else{
    store.clearAll()
  }
}

// 暴露
export default {
  set,
  get,
  remove,
  KEYS: {
    USER_KEY: 'user_key',
    TOKEN_KEY: 'token_key'
  }
}