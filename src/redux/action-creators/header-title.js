/**
 * 管理获取路由标题的action
 */
import {
  SET_HEADER_TITLE
} from '../action-types'

export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, data: headerTitle})