import {combineReducers} from 'redux'

import onboard from './onboard'
import user from './user'
import room from './room'
import api from './api'

export default combineReducers({
    onboard,
    user,
    room,
    api
})

