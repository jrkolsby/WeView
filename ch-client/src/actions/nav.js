import ACTIONS from '.'

export const openModal = (modalIndex) => {
    return {
        type: ACTIONS.OPEN_MODAL,
        payload: modalIndex
    }

}
export const navigateTo = (pageIndex) => {
    return {
        type: ACTIONS.NAVIGATE,
        payload: pageIndex
    }
}

export const error = (message) => {
    return {
        type: ACTIONS.ERROR,
        payload: message 
    }
}

export const success = (message) => {
    return {
        types: ACTIONS.SUCCESS 
    }

}

export const loading = (progress) => {
    return {
        type: ACTIONS.LOADING,
        payload: progress
    }
} 
