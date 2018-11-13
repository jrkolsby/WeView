import React from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as navActions from '../actions/nav'
import * as userActions from '../actions/user'

const HeaderContainer = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
            <nav>
                <a href="/">New Decision</a>
                {props.temp ? (<a href="/new">Create Account</a>) : null}
                {props.temp ? null : (<a href="/logout">Logout</a>)}
            </nav>
        </header>
    ) 
}

const mapState = (state) => {
    return {
        ...state.nav,
        ...state.user
    }
}

const mapDispatch = (dispatch) => {
    return { 
        ...bindActionCreators(navActions, dispatch), 
        ...bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapState, mapDispatch)(HeaderContainer)
