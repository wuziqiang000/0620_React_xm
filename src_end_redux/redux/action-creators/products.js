/**
 * 用于创建action（多个）对象：
 */

import { ADDPRODUCT,DELPRODUCT } from "../action-types/action-types";


//  同步增加
export const addProduct = (number)=>({type: ADDPRODUCT, data: number})

// 同步减少
export const delProduct = (number)=>({type: DELPRODUCT, data: number})

