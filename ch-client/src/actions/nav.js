import ACTIONS from '.'

export const gotoModal = (modalIndex) => {
    return {
        type: ACTIONS.GOTO_MODAL,
        payload: modalIndex
    }
}

export const gotoPage = (pageIndex) => {
    return {
        type: ACTIONS.GOTO_PAGE,
        payload: pageIndex
    }
}

export const showError = (message) => {
    return {
        type: ACTIONS.SHOW_ERROR,
        payload: message 
    }
}

export const showSuccess = (message) => {
    return {
        type: ACTIONS.SHOW_SUCCESS,
        payload: message
    }

}

export const showLoading = (progress) => {
    return {
        type: ACTIONS.SHOW_LOADING,
        payload: progress
    }
} 
