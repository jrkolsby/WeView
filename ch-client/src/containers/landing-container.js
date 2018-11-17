import React from 'react'

import AccountForm from '../components/accountForm'
import RoomForm from '../components/roomForm'

import * as roomActions from '../actions/room'
import * as userActions from '../actions/user'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export const LandingContainer = (props) => (
    <div className="landing-container">
        <h1>Finally make a decision with your friends!</h1> 
        {props.state.modal === 0 ? (
            <RoomForm 
                name="room"
                title="Make Decision"
                primary="Decide"
                onSubmit={props.dispatch.createRoom}
            /> 
        ) : null}
        {props.state.modal === 1 ? (
            <AccountForm 
                name="login"
                title="Login"
                primary="Login"
                secondary="or join..."
                handleSecondary={() => {
                    props.dispatch.openModal(2)
                }}
                onSubmit={(form) => {
                    props.dispatch.login(
                        form.loginUser, form.loginPass
                    )
                }}
            />
        ) : null}
        {props.state.modal === 2 ? (
            <AccountForm 
                name="signup"
                title="Signup"
                primary="Create Account"
                secondary="or login..."
                handleSecondary={() => {
                    props.dispatch.openModal(1)
                }}
                onSubmit={(form) => {
                    props.dispatch.signup(
                        form.signupUser, form.signupPass
                    )
                }}
            />
        ) : null}
    </div>
)

const mapState = (state) => {
    return {
        state: {
            ...state.nav
        }
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatch: {
            ...bindActionCreators(navActions, dispatch),
            ...bindActionCreators(roomActions, dispatch),
            ...bindActionCreators(userActions, dispatch) 
        }
    }
}

export default connect(mapState, mapDispatch)(LandingContainer)

