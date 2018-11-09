import React, {Component} from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as apiActions from '../actions/api'
import * as roomActions from '../actions/room'

import io from 'socket.io-client'

class RoomContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const socket = io("http://localhost:5000")
        socket.on("message", (data) => {
        
        })
    }

    render() {
        return (
            <input type="text" /> 
        ) 
    }
}

const stateToProps = (state) => {
    return state.room
}

const dispatchToProps = (dispatch) => {
    return {
        actions: {
            api: bindActionCreators(apiActions, dispatch),
            room: bindActionCreators(roomActions, dispatch) 
        } 
    }
}
export default connect(stateToProps, dispatchToProps)(RoomContainer)

