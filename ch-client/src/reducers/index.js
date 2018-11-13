import {combineReducers} from 'redux'

import nav from './nav'
import game from './game'
import user from './user'

export default combineReducers({
    nav,
    user,
    game,
})
