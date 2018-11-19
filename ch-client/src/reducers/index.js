import {combineReducers} from 'redux'
import { reducer as form } from 'redux-form'

import nav from './nav'
import list from './list'
import user from './user'

export default combineReducers({
    nav,
    list,
    user,
    form
})
