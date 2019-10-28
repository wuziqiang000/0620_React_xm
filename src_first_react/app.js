import React, { Component } from 'react'

export default class App extends Component {
  // 将点击次数保存到状态中
  state = {
    count:0
  }

  // 创建一个容器，用于保存加或减的基数（即下拉框显示的数值）
  numberRef = React.createRef()

  // 绑定点击事件
  // 同步增加
  increment = () => {
    // 获取到相加的基数
    // 得到的是字符串，要将其转换成数值型
    const number = this.numberRef.current.value * 1
    // 更新状态
    this.setState({
      count:this.state.count + number
    })
  }

  // 同步减少
  decrement = () => {
    // 获取到相减的基数
    // 得到的是字符串，要将其转换成数值型
    const number = this.numberRef.current.value * 1
    // 更新状态
    this.setState({
      count:this.state.count - number
    })
  }

  // 当点击次数为奇数时，增加
  incrementIfOdd = () =>{
    const number = this.numberRef.current.value * 1
    // 判断是否为基数
    if (this.state.count %2 === 1) {
      // 更新状态
      this.setState({
        count:this.state.count + number
      })
    }
  }

  // 定时器到达时间后，增加
  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      // 更新状态
      this.setState({
        count:this.state.count + number
      })
    }, 2000);
  }

  render() {
    const count = this.state.count
    return (
      <div>
        <h2>你点击了 {count} 次</h2>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    )
  }
}
