import {ACTIONS} from '.'

export const addChoice = (message) => {

}

export const joinRoom = (roomID) => {
    return {
        type: ACTIONS.JOIN_ROOM,
        payload: roomID
    }
}

export const createRoom = (signup) => {
    return {
        type: ACTIONS.CREATE_ROOM
    }
}
