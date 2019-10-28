/* 
登陆的一级路由组件
*/
import React, { Component } from 'react'
// 重定向
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'


import {loginAsync} from '../../redux/action-creators/user'
import logo from '../../assets/images/logo.png'
import './index.less'
// 检测是否登录
import WithCheckLogin from '../with-check-login'

const { Item } = Form 

// 使用装饰器，简化代码
@connect(
  state => ({}),  // 用于显示的一般属性
  {loginAsync} // 用于更新状态的函数属性
)
@Form.create()    // 相当于Login = Form.create()(Login)
@WithCheckLogin
class Login extends Component {

  handleSubmit = (event) => {
    // 阻止默认行为（表单提交）
    event.preventDefault() 

    // 对表单进行统一验证
    this.props.form.validateFields((err, values) => {
      // 表单验证成功，发送ajax请求
      if (!err) { 
        
        const {username, password} = values

        this.props.loginAsync(username, password)
        /*简单使用
        ajax.post('/login', values) // username=admin&password=admin
          .then((result) => {
            const {status, data: {user, token}={}, msg, xxx='abc'} = result // 嵌套解构 变量默认值
            console.log('xxx', xxx)
            if (status===0) {
              console.log('登陆成功', user, token )
            } else {
              console.log('登陆失败', msg)
            }
          })
        */
        
          
      } else {
        // 什么都不用写
      }
    });
  }

  validatePwd = (rule, value, callback) => {
    /*
    用户名/密码的的合法性要求
      1). 必须输入
      2). 必须大于等于4位
      3). 必须小于等于12位
      4). 必须是英文、数字或下划线组成
    */
  //  命令式验证
   // value = value.trim()
   if (value==='') {
     callback('密码必须输入')
   } else if (value.length<4) {
     callback('密码必须大于等于4位')
   } else if (value.length>12) {
     callback('密码必须小于等于12位')
   } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
     callback('密码必须是英文、数字或下划线组成')
   } else {
     callback() // 验证通过/成功
   }
  }

  render() {

    
    // 原生写法：可用装饰器代替
    // const {hasLogin} = this.props
    // // 如果已经登陆, 自动跳转到admin界面
    // if (hasLogin) { 
    //   // this.props.history.replace('/')
    //   // 重定向到admin界面
    //   return <Redirect to="/"/> 
    // }

    const { getFieldDecorator } = this.props.form;


    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username',{ // 配置对象
                  initialValue: '', // 初始值
                  /*
                  用户名/密码的的合法性要求
                    1). 必须输入
                    2). 必须大于等于4位
                    3). 必须小于等于12位
                    4). 必须是英文、数字或下划线组成
                  */
                  // 声明式验证: 利用已有的验证规则进行验证, 不用亲自判断
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                })(
                  <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                )
              }
            </Item>
            <Form.Item>

              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    // 自定义验证
                    {validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

//不使用装饰器的写法
// export default connect(
//   state => ({hasLogin: state.user.hasLogin}),  // 用于显示的一般属性
//   {loginAsync} // 用于更新状态的函数属性
// )(Form.create()(Login))

// 使用装饰器
export default Login


