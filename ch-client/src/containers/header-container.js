import React from 'react'

import * as userActions from '../actions/user'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const HeaderContainer = (props) => {
    return (
        <header>
            <h1>{props.state.title}</h1>
            <h3>{props.state.subtitle}</h3>
            <nav><ul>
                <li href="/new"
                    onClick={(e) => {
                        props.dispatch.navigateTo(1)
                    }}
                >Create Account</li>

                {props.state.temp ? (
                    <li href="/new"
                        onClick={(e) => {
                            props.dispatch.navigateTo(1)
                        }}
                    >Create Account</li>
                ) : null}

                {props.state.temp ? null : (
                    <li href="/logout"
                        onClick={(e) => {
                            props.dispatch.logout()
                        }}
                    >Logout</li>
                )}
            </ul></nav>
            {props.state.messages.map((m, i) => (
                <div className="message">{m}</div> 
            ))}
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
