/**
 * 用于创建action的对象
 *    具体的交互行为
 */
import { DECREEMENT,INCREEMENT } from './CONST'

// 增加
export const increment = (number) => ({type: INCREEMENT, data: number})

//减少
export const decrement = (number) => ({type: DECREEMENT, data: number})