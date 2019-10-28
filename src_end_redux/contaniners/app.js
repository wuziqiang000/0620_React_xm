import React from 'react'
import { connect } from 'react-redux'

import Counter from '../componsents/countors'
import {increment, decrement, incrementAsync} from '../redux/action-creators/counts'

export default connect(
  state => ({count: state.count}),  
  {increment, decrement, incrementAsync} 
)(Counter)