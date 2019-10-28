# day01：react项目基本了解
## 1. 开发环境与生产环境
    1. 开发环境运行
        命令: npm start
        做了什么:
            1). 在内存中打包, 生成内存中的打包文件(html/js/css/img)
            2). 启动服务器, 运行内存中的打包文件 ===> 在浏览器中通过虚拟地址来访问得到相应的资源 
    2. 生产环境打包并运行
        命令:
            npm run build
            serve build
        使用了什么
            1). 在内存中打包, 生成内存中的打包文件(html/js/css/img)
            2). 将内存中的打包文件保存到本地
            3). 加载打包文件到内存
            4). 启动服务器运行 ===> 在浏览器中通过虚拟地址来访问得到相应的资源 

## 2. 几个重要概念
    1). 实例对象与函数对象
    2). 属性与方法
    3). 方法与函数

## 3. 项目开发准备
    1). 描述项目
    2). 技术选型 
    3). API接口/接口文档/测试接口

## 4. 启动项目开发
    1). 使用react脚手架创建项目
    2). 开发环境运行: npm start
    3). 生产环境打包运行: npm run build   serve build

## 5. git管理项目
    1). 创建远程仓库
    2). 创建本地仓库
        配置.gitignore
        git init
        git add .
        git commit -m "init"
    3). 将本地仓库推送到远程仓库
        git remote add origin url
        git push origin master
    4). 在本地创建dev分支, 并推送到远程
        git checkout -b dev
        git push origin dev
    5). 如果本地有修改
        git add .
        git commit -m "xxx"
        git push origin dev
    6). 新的同事: 克隆仓库
        git clone url
        git checkout -b dev origin/dev
        git push origin dev
    7). 如果远程修改了
        git pull origin dev
    8). 如何得到后面新增的远程分支
        git pull
        git checkout -b dev origin/xxx

## 6. 创建项目的基本结构
    api: ajax请求的模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js

## 7 引入antd
    下载antd的包
    按需打包: 只打包import引入组件的js/css
        下载工具包
        config-overrides.js
        package.json
    自定义主题
        下载工具包
        config-overrides.js
    使用antd的组件
        根据antd的文档编写

## 8. 引入路由
    下载包: react-router-dom
    拆分应用路由:
        Login: 登陆
        Admin: 后台管理界面
    注册路由:
        <BrowserRouter> / <HashRouter>
        <Switch>
        <Route path='' component={}/>
    路由匹配
        逐级路由匹配: 先匹配上一个1级路由==> 进入这个路由的组件==> 匹配其内部1个子路由
        只要匹配上一个, 后面的不看了
        默认是模糊(只匹配前面部分), 通过exact属性指定完全匹配

## 9. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登陆表单界面
      Form  / Form.Item
      Input
      Icon
      Button

## 10. 高阶函数与高阶组件
    1). 高阶函数
        定义: 接收的参数是函数或者返回值是函数
        常见的: 数组遍历相关的方法 / 定时器 / bind() / Promise / Form.create()(组件)
        作用: 实现一个更加强大, 动态的功能
    2). 高阶组件: 
        本质是一个高阶函数
        函数接收一个组件, 返回一个新的组件
        常见的高阶组件:
            Form.create()返回的就是一个高阶组件 :  Form.create()(组件) 返回一个新的组件
            connect()返回的就是一个高阶组件: connect()(UI组件)返回容器组件
    
    3). 高阶组件与高阶函数的关系
        高阶组件是特别的高阶函数
        接收一个组件函数, 返回是一个新的组件函数

## 11. 收集表单数据和表单的前台验证
    1). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
        用到了高阶函数和高阶组件的技术
    
    2). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.getFieldValue(id): 根据标识得到对应字段输入的数据
        form.resetFields(['password']): 重置输入值
     
    3). 前台表单验证
        a. 声明式实时表单验证:
            form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        b. 自定义表单验证
            form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
            validatePwd = (rule, value, callback) => {
              if(有问题) callback('错误提示信息') else callack()
            } 
        c. 点击登陆时统一验证
            form.validateFields((error, values) => {
              if(!error) {通过了验证, 发送ajax请求}
            })

# day02：redux：集中状态管理
# 0. redux要点
		1). redux理解
		2). redux相关API
		3). redux核心概念(3个)
		4). redux工作流程
		5). 使用redux及相关库编码

# 1. redux理解
		什么?: redux是专门做状态管理的独立第3方库, 不是react插件, 但一般都用在react项目中
		作用?: 对应用中状态进行集中式的管理(写/读)
		开发: 与react-redux, redux-thunk等插件配合使用

# 2. redux相关API
		1). redux: 管理组件状态
				redux中包含: createStore(), combineReducers(), applyMiddleware()
				store对象: getState(), dispatch(action), subscribe(listener)
				reducer函数: 根据原有的state和指定的action, 返回一个新的状态数据
				action creator: 返回action的工厂函数 

		2). react-redux: 简化redux使用
				<Provider store={store}>: 向所有的容器组件提供store
				connect(
					state => ({xxx: state.xxx}),
					// dispatch => ({actionCreator1: (...args) => actionCreator1(...args)})
					{actionCreator1, actionCreator2}
				)(UI组件): 
				产生的就是容器组件, 负责向UI组件传递标签属性, 
				一般属性值从state中获取, 
				函数属性内部会执行dispatch分发action
		
		3). redux-thunk: redux异步编程
				import {createStore, applyMiddleware} from 'redux'
				import thunk from 'redux-thunk'
				createStore(reducer, applyMiddleware(thunk))
				// 异步action creator
				const incrementAsync = (number) => {
					// 立即返回action函数
					return dispatch => {
						执行异步任务
						有结果后dispatch(同步action对象)
					}
				}

# 3. redux核心概念(3个)
		action: 
				默认是对象(同步action), {type: 'xxx', data: value}, 需要通过对应的actionCreator产生, 
				它的值也可以是函数(异步action), 需要引入redux-thunk才可以
		reducer
				根据老的state和指定的action, 返回一个新的state
				不能修改老的state, 返回一个新的state值
		store
				redux最核心的管理对象
				内部管理着: state和reducer
				提供方法: getState(), dispatch(action), subscribe(listener)

# 4. redux工作流程图
![](https://github.com/zxfjd3g/190620_admin-client/blob/redux/redux%E6%B5%81%E7%A8%8B%E7%BB%93%E6%9E%84.png?raw=true)
		
# 5. 使用redux及相关库编码
		需要引入的库: 
				redux
				react-redux
				redux-thunk
				redux-devtools-extension(这个只在开发时需要)
		redux文件夹: 
				action-creators
						count.js
						products.js
				reducers
						count.js
						product.js
						index.js
				action-types.js
				store.js
		组件分2类: 
				ui组件(components): 不使用redux相关API
				容器组件(containers): 通过connect()()生成的组件

# day03：登录与退出登录
## 实现功能
		登陆
		退出登陆
		自动(免)登陆

## 需要下载使用的相关插件
		octotree: chrome插件, github仓库结构导航
		nodemon/全局: 带监视node, 修改代码自动重新运行
		redux: 状态管理
		react-redux: 简化redux使用
		redux-thunk: redux异步编程
		redux-devtools-extension: 为了chrome的redux调试
		axios: 发ajax请求(与后台交互)
		nprogress: 请求进度效果
		@babel/plugin-proposal-decorators: 提供装饰器语法的babel插件

## 编码要点
### 1. 搭建redux开发环境
		1). 下载相关包
		2). 创建相关的文件/文件夹: redux
				action-creators
						user.js
						xxx.js
				reducers
						user.js
						xxx.js
						index.js
				action-types.js
				store.js

### 2. 测试接口
		1). 接口文档
		2). postman工具

### 3. 使用axios发请求, 解决ajax请求跨域问题
		1). axios的基本使用
		2). 开发解决ajax跨域
				配置代理: webpack-dev-server ==> http-proxy-middleware
					当前台应用内部发出一个请求时, 先找前台项目对应的资源返回
					如果没有, 通过http-proxy-middleware转换请求到指定的目标地址(后台项目处理返回)
				请求的url不用指定前面的基本路径

### 3. 对axios进行ajax请求二次封装 (axios二次封装)
		1). 请求前处理: 请求拦截器成功回调中
				a. 对象类型post请求体data数据, 修改成urlencoded格式(默认会用json)
				b. 显示请求的progress
				注意: 最后返回config

		2). 请求成功后处理: 响应拦截器成功回调中
				a. 方式一: 返回response.data  ===> 后面的请求处理代码需要判断status来做不同处理
				b. 方式二:
						操作成功了(status是0), 返回response.data.data  
						操作失败了, 返回失败的promise, reason为response.data.msg   ===> 后面的请求处理代码catch来处理

		3). 请求失败后处理: 响应拦截器失败回调中
				统一处理请求错误
				a. 显示一个错误提示: '请求出错: ' + error.message
				b. 中断promise链: 返回pending状态的promise

### 4. 登陆
		1). 登陆的接口请求函数: reqLogin
		2). 登陆的异步action creator: loginAsync
		3). 保存user和token的同步action creator: saveUserToken 
		4). 管理user和token数据的reducer
		5). login组件分发登陆的异步action
		6). login组件读取state中user的hasLogin数据, 如果为true自动跳转到admin
		7). admin组件读取state中user的username和hasLogin数据, 如果hasLogin为false自动跳转到login

### 5. 退出登陆
		1). 删除user和token的同步action creator: removeUserToken
		2). 清除state中的user和token数据的reducer
		3). admin组件中分发同步action


### 6. 使用装饰器语法简化高阶组件使用
		1). 下载: @babel/plugin-proposal-decorators
		2). 添加配置: config.overrides.js中
		3). 使用装饰器语法: 简化高阶组件的使用

# day04：token验证


