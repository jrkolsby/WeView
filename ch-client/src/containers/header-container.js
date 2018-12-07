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
        {props.state.progress > 0 ? (
            <div className="progress"></div>
        ) : null}
        <div className="wrapper">
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
                        placeholder="What's the question?"
                        active={props.state.currentModal === 3}
                        onSubmit={(form) => {
                            props.dispatch.createList(form.name)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? "active" : ""}>
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
                        placeholder="Room URL"
                        active={props.state.currentModal === 4}
                        onSubmit={(form) => {
                            props.dispatch.joinList(form.name)
                        }}
                    />
                </div>

                <div className={props.state.loggedIn ? "" : "active"}>
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

                <div className={props.state.loggedIn ? "" : "active"}>
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

                <div className={props.state.loggedIn ? "active" : ""}>
                    <a href="#logout"
                        onClick={(e) => {
                            props.dispatch.logout()
                            props.dispatch.gotoModal(0)
                        }}
                    ><span>Logout</span> {props.state.username}</a>
                </div>
            </nav>

            <div className="nav-header">
                <a href="#back"
                    onClick={(e) => {
                        props.dispatch.gotoPage(0)
                    }}
                >Bracket</a>
                <h4>
                {props.state.navTitle + " "}
                {Object.values(props.state.users).map((u, i, a, r) => {
                    return u.name + (i < a.length - 1 ? ", " : "")
                })}
                </h4>
                <a href="#next"
                    onClick={(e) => {
                        console.log(props.state)
                        if (props.state.voteID < 0) {
                            console.log('get first vote!!')
                            props.dispatch.createVote()
                        }
                        props.dispatch.gotoPage(1)
                    }}
                >Vote</a>
            </div>

            <div className="messages">
                {props.state.messages.map((m, i) => (
                    <div key={i} 
                        className={"message " + m.type + (m.time < (new Date()).getTime() - 1000 ? " hidden" : "")}>
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
            ...state.list,
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
