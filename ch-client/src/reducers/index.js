import {combineReducers} from 'redux'

import onboard from './onboard'
import api from './api'

export default combineReducers({
    onboard,
    api
})

