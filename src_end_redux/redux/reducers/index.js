/**
 * 整合counts与products
 */
import {combineReducers} from 'redux'

import count from "./counts";
import product from "./products";

export default combineReducers({
  count,
  product
})