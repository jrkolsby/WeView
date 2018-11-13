import ACTIONS from '.'

import {gameAPI} from './api'

export const navigateTo = (pageIndex) => {
    return {
        type: ACTIONS.NAVIGATE,
        payload: pageIndex
    }
}

