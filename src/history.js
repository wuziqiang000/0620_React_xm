/**
 * 向外暴露一个history对象：用于简化地址栏
 */
import { createBrowserHistory } from 'history'
// 向外暴露不带#的history
export default createBrowserHistory()