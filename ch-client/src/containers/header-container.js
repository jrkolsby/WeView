import React from 'react'

import * as userActions from '../actions/user'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AccountForm from '../components/accountForm'

const HeaderContainer = (props) => {
    return (
        <header>
        <div className="wrapper">
            <h1>{props.state.title}</h1>
            <h3>{props.state.subtitle}</h3>
            <nav><ul>
                <li onClick={(e) => {
                    props.dispatch.gotoModal(1)
                }}
                >New Decision</li>

                {props.state.loggedIn ? null : (
                    <li onClick={(e) => {
                        props.dispatch.gotoModal(1)
                    }}
                    >Login</li>
                )}

                {props.state.loggedIn ? (
                    <li onClick={(e) => {
                        props.dispatch.logout()
                    }}
                    >Logout</li>
                ) : null}
            </ul></nav>
            <div className="messages">
                {props.state.messages.map((m, i) => (
                    <div className="message">{m}</div> 
                ))}
            </div>
            <div className="modals">
                {props.state.currentModal === 1 ? (
                    <AccountForm
                        title="Login"       
                        name="login"
                        primary="Login"
                        onSubmit={(form) => {
                            props.dispatch.login(form.loginUser, 
                                                 form.loginPass)
                        }}
                    />
                ) : null}
                {props.state.currentModal === 2 ? (
                    <AccountForm
                        title="Signup"       
                        name="signup"
                        primary="Create Account"
                        onSubmit={(form) => {
                            console.log(form) 
                        }}
                    />
                ) : null}
                
            </div>
        </div>
        </header>
    ) 
}

const mapState = (state) => {
    return {
        state: {
            ...state.nav,
            ...state.user
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

export default connect(mapState, mapDispatch)(HeaderContainer)
