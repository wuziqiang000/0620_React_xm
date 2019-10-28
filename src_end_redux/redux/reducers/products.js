/**
 * 管理counts的reducer函数
 *        counts状态state的变化
 */

 import { ADDPRODUCT,DELPRODUCT } from '../action-types/action-types'

// 初始状态值
const initProduct = []
export default function count(state = initProduct,action){
  // 判断：当action.type=INCREEMENT时，加
  //      当action.type=DECREEMENT时，减
  switch (action.type) {
    case ADDPRODUCT:
      const product = action.data
      return [product,...state]
    case DELPRODUCT:
      return state
    default:
      return state
  }
}

