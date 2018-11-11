import React, {Component} from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as apiActions from '../actions/api'
import * as roomActions from '../actions/room'

import io from 'socket.io-client'

class RoomContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {choice: ""}
        this.addChoice = this.addChoice.bind(this)
    }

    componentDidMount() {
        const socket = io("http://localhost:5000")
        socket.on("message", (data) => {
            console.log(data) 
        })
    }

    addChoice() {
        this.props.room.addChoice(this.state.choice)
    }

    render() {
        return (
            <div id="room">
                <input type="text"
                    onChange={(e) => {
                        this.setState({choice: e.target.value})}}
                />
                <button onClick={this.addChoice}
                >Add Choice</button>
            </div>
        ) 
    }
}

const stateToProps = (state) => {
    return {
        room: state.room,
        user: state.user 
    }
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

