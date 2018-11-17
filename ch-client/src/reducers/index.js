import {combineReducers} from 'redux'
import { reducer as form } from 'redux-form'

import nav from './nav'
import room from './room'
import user from './user'

export default combineReducers({
    nav,
    user,
    room,
    form
})
