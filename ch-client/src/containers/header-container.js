import React from 'react'

import * as userActions from '../actions/user'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AccountForm from '../components/accountForm'
import DecisionForm from '../components/decisionForm'

import { reduxForm, FormSection } from 'redux-form'

const HeaderContainer = (props) => {
    console.log('loggedIn', props.state.loggedIn)
    console.log(props.state)
    return (
        <header>
        <div className="wrapper">
            {props.state.progress ? (
                <div className="progress"></div>
            ) : null}
            <h1>{props.state.pageTitle}</h1>
            <h3>{props.state.loggedIn ? "Hello, " + props.state.name : null}</h3>
            <nav>
                <div>
                    <a href="#new"
                        onClick={(e) => {
                            e.preventDefault()
                            if (props.state.loggedIn) {
                                props.dispatch.gotoModal(3) 
                            } else {
                                props.dispatch.gotoModal(1)
                            }
                        }}
                    >New Decision</a>
                    {props.state.currentModal === 3 ? (
                        <FormSection name="decision">
                            <DecisionForm
                                form="decision"
                                title="New Decision"       
                                primary="Create Decision"
                                onSubmit={(form) => {
                                    props.dispatch.createList(form.name)
                                }}
                            />
                        </FormSection>
                    ) : null} 
                </div>

                {props.state.loggedIn ? null : (
                    <div>
                        <a href="#signup"
                            onClick={(e) => {
                                e.preventDefault()
                                props.dispatch.gotoModal(2)
                            }}
                        >Signup</a>
                        {props.state.currentModal === 2 ? (
                            <FormSection name="signup">
                            <AccountForm
                                form="signup"
                                title="Sign Up"       
                                primary="Create Account"
                                onSubmit={(form) => {
                                    props.dispatch.signup(form.user, 
                                                          form.pass)
                                }}
                            />
                            </FormSection>
                        ) : null} 
                    </div>
                )}

                {props.state.loggedIn ? null : (
                    <div>
                        <a href="#login"
                            onClick={(e) => {
                                e.preventDefault()
                                props.dispatch.gotoModal(1)
                            }}
                        >Login</a>
                        {props.state.currentModal === 1 ? (
                            <FormSection name="login">
                                <AccountForm
                                    form="login"
                                    title="Log In"
                                    primary="Login"
                                    onSubmit={(form) => {
                                        props.dispatch.login(form.user, 
                                                             form.pass)
                                    }}
                                />
                            </FormSection>
                        ) : null}
                    </div>
                )}

                {props.state.loggedIn ? (
                    <div>
                        <a href="#logout"
                            onClick={(e) => {
                                props.dispatch.logout()
                                props.dispatch.gotoModal(0)
                                e.preventDefault()
                            }}
                        >Logout</a>
                    </div>
                ) : null}
            </nav>
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
        }
    }
}

const mapDispatch = (dispatch) => {
    return { 
        dispatch: {
            ...bindActionCreators(navActions, dispatch), 
            ...bindActionCreators(userActions, dispatch)
        }
    }
}

export default reduxForm({form: "account"})(connect(mapState, mapDispatch)(HeaderContainer))
