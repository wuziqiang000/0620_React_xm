/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'


/* 登陆接口 */
export const reqLogin = ({username, password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {username, password}
})

/* 获取用户列表接口 */
export const reqUsers = () => ajax({
  url: '/manage/user/list',
  method: 'GET',
})

/*获取天气相关信息接口：使用jsonp */
export const reqWeather = (city) => {

  return new Promise((resolve,reject) => {

    // 接口地址
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    //发送请求
    jsonp(url, {}, (err,data) => {
      // 发送请求成功
      if (!err && data.status === 'success') {
        //拿到天气图片地址、天气文本信息
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else{
        // 发送请求失败
        message.error('获取天气失败')
        // 中断promise链
        return new Promise(()=>{})
      }
    })
  })
}

/* 
获取所有分类的列表
*/
export const reqCategorys = () => ajax('/manage/category/list')
