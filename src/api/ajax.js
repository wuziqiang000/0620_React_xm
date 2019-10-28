/**
 * 对axios进行二次封装（发送ajax请求）
    1). 将post请求的data对象数据转换为urlencode格式的字符串数据
    2). 如果请求成功, 判断操作是否成功
        如果成功返回返回的data数据, 外部具体请求得到需要的数据
        如果失败返回携带msg的错误, 外部具体请求处理错误
    3).统一处理请求异常, 外部调用者不用再处理请求异常
    4). 请求过程中显示请求进度的效果
    5).验证token值
        在请求拦截器中：发送登录请求时，保存token值
        在响应拦截器中：进入失败的回调
              发送请求没有token值
              发送请求token值过期，自动跳转登录页面
                  清空用户信息
                  当发送多个请求时，跳转到登录页面，只显示一个信息即可
 */
// 第三方文件
//  axios发送请求
 import axios from "axios";
//  将json参数转换为urlenclde参数
 import qs from 'qs'
 //  用于显示错误信息
 import {message} from 'antd'
//  进度条
 import NProgress from 'nprogress'
//  进度条样式
  import 'nprogress/nprogress.css'


//自定义文件 
 import store from "../redux/store";
//  清空用户信息
 import {removeUserToken} from '../redux/action-creators/user'
 import history from '../history'



/**
 * 创建instance：用于发送ajax请求
 */
const instance = axios.create({// 配置对象
  timeout:10000 //允许超时时间

})

// 添加请求拦截器
/**
 * 1). 将post请求的data对象数据转换为urlencode格式的字符串数据
 */
instance.interceptors.request.use((config) =>{

  // 显示请求进度
  NProgress.start()

  const {data} = config
  // 当传入的数据为对象时，将其转换为urlencode格式
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

// 验证token值：若有token值，则保存到请求头中
  // 取得token值
  const token = store.getState().user.token
  // 保存token
  if (token) {
    // 保存到请求头中
    config.headers.Authorization = 'atguigu_' + token
    // config.headers['Authorization'] = 'atguigu_' + token
  }



// 必须返回config
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {

    // 隐藏进度条
  NProgress.done()

  const result = response.data
  return result
  },
  error =>{
    // 显示请求进度
  NProgress.start()

// token值过期/没有token值
    // 拿到错误信息
  const { status, data: {msg}={} } = error.response
  // 如果status为401, token有问题
  if (status===401) {
    /**
     * 当发送多个请求时，自动跳转到登录页面，显示一个提示信息
     */
    if (history.location.pathname !=='/login') {
       // 显示提示
      message.error(msg)
      // 删除用户信息, 自动跳转到登陆界面
      store.dispatch(removeUserToken())
    }
  } else if (status===404) {
    // 请求地址错误
    message.error('请求资源不存在')
  } else {
    // 统一的错误处理
    message.error('请求出错: ' + error.message)
  }

  // 中断promise链
  return new Promise(()=>{})
  }

)

export default instance
