/**
 * 管理counts的reducer函数
 *        counts状态state的变化
 */

 import { INCREEMENT,DECREEMENT } from '../action-types/action-types'

// 初始状态值
const initCount = 1
export default function count(state = initCount,action){
  // 判断：当action.type=INCREEMENT时，加
  //      当action.type=DECREEMENT时，减
  switch (action.type) {
    case INCREEMENT:
      return state + action.data;
    case DECREEMENT:
      return state - action.data;
    default:
      return state
  }
}

