import {ACTIONS} from '.'

export const login = (verified) => {
    return {
        type: ACTIONS.CLOSE_ONBOARD,
        payload: verified
    }
}
