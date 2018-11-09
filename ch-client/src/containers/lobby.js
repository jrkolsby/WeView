import React, {Component} from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from '../actions/room'

class LobbyContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room: ""
        } 
    }

    render() {
        return (
            <div id="lobby container">
                <input type="text"
                    placeholder="Lobby ID"
                    value={this.state.room}
                    onChange={(e)=> {
                        this.setState({
                            room: e.target.value 
                        }) 
                    }}
                />
                <button
                    onClick={this.props.actions.room.join}
                >Join Room</button>
                <button
                    onClick={this.props.actions.room.start}
                >Start New Room</button>
            </div> 
        )
    }
}

const stateToProps = (state) => {
    return state.room
}

const dispatchToProps = (dispatch) => {
    return {
        actions: {
            room: bindActionCreators(roomActions, dispatch),
        } 
    }
}
export default connect(stateToProps, dispatchToProps)(LobbyContainer)

