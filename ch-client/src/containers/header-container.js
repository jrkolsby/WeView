import React from 'react'

import * as userActions from '../actions/user'
import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AccountForm from '../components/accountForm'
import DecisionForm from '../components/decisionForm'

import { reduxForm } from 'redux-form'

const HeaderContainer = (props) => {
    return (
        <header>
        <div className="wrapper">
            {props.state.progress ? (
                <div className="progress"></div>
            ) : null}
            <h1>{props.state.pageTitle}</h1>
            <h3>{props.state.pageSubtitle}</h3>
            <nav>
                <div className="active">
                    <a href="#new"
                        onClick={(e) => {
                            props.state.loggedIn ?
                                props.dispatch.gotoModal(3) :
                                props.dispatch.gotoModal(1)
                        }}
                    >Decide</a>
                    <DecisionForm
                        form="new-decision"
                        title="New Decision"       
                        primary="Create Decision"
                        active={props.state.currentModal === 3}
                        onSubmit={(form) => {
                            props.dispatch.createList(form.name)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? " active" : ""}>
                    <a href="#join"
                        onClick={(e) => {
                            props.state.loggedIn ? 
                                props.dispatch.gotoModal(4) :
                                props.dispatch.gotoModal(1)
                        }}
                    >Join</a>
                    <DecisionForm
                        form="join"
                        title="Join Decision"       
                        primary="Join"
                        active={props.state.currentModal === 4}
                        onSubmit={(form) => {
                            props.dispatch.joinList(form.name)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? "" : " active"}>
                    <a href="#signup"
                        onClick={(e) => {
                            props.dispatch.gotoModal(2)
                        }}
                    >Signup</a>
                    <AccountForm
                        form="signup"
                        title="Sign Up"       
                        primary="Create Account"
                        active={props.state.currentModal === 2}
                        onSubmit={(form) => {
                            props.dispatch.signup(form.user, 
                                                  form.pass)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? "" : " active"}>
                    <a href="#login"
                        onClick={(e) => {
                            props.dispatch.gotoModal(1)
                        }}
                    >Login</a>
                    <AccountForm
                        form="login"
                        title="Log In"
                        primary="Login"
                        active={props.state.currentModal === 1}
                        onSubmit={(form) => {
                            props.dispatch.login(form.user, 
                                                 form.pass)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? " active" : ""}>
                    <a href="#logout"
                        onClick={(e) => {
                            props.dispatch.logout()
                            props.dispatch.gotoModal(0)
                        }}
                    >Logout {props.state.username}</a>
                </div>
            </nav>

            <div className="users">
                {Object.entries(props.state.users).map(([id, u]) => (
                    <div key={id}
                        className="user">
                    {u.name},
                    </div>
                ))}
            </div>

            <div className="messages">
                {props.state.messages.map((m, i) => (
                    <div key={i} 
                        className={"message " + m.type}>
                    {typeof m.payload === "string" ? m.payload : 
                        JSON.stringify(m.payload)}
                    </div> 
                ))}
            </div>
        </div>
        </header>
    ) 
}

const mapState = (state) => {
    return {
        state: {
            ...state.nav,
            ...state.user,
            users: state.list.users
        }
    }
}

const mapDispatch = (dispatch) => {
    return { 
        dispatch: {
            ...bindActionCreators(navActions, dispatch), 
            ...bindActionCreators(listActions, dispatch), 
            ...bindActionCreators(userActions, dispatch)
        }
    }
}

export default reduxForm()(connect(mapState, mapDispatch)(HeaderContainer))
