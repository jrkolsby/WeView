import {ACTIONS} from '.'

export const closeOnboard = (verified) => {
    return {
        type: ACTIONS.CLOSE_ONBOARD,
        payload: verified
    }
}

export const openOnboard = (signup) => {
    return {
        type: ACTIONS.OPEN_ONBOARD,
        payload: signup
    }
}
