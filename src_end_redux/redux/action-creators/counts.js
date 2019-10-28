/**
 * 用于创建action（多个）对象：
 */

import { INCREEMENT,DECREEMENT } from "../action-types/action-types";


//  同步增加
export const increment = (number)=>({type: INCREEMENT, data: number})

// 同步减少
export const decrement = (number)=>({type: DECREEMENT, data: number})

// 异步增加
export const incrementAsync = (number,delayTime)=>{
  // 必须返回一个dispatch函数，dispatch内部写异步回调函数
  return dispatch=>{
    setTimeout(() => {
      dispatch(increment(number))
    }, delayTime);
  }
}