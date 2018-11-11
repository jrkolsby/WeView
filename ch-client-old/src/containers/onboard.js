import React, {Component} from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as apiActions from '../actions/api'
import * as onboardActions from '../actions/onboard'

import AccountModal from '../components/account-modal'

class ModalContainer extends Component {
    constructor(props) {
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this)
        this.gotoSignup = this.gotoSignup.bind(this)
    }

    gotoLogin() { this.props.actions.onboard.openOnboard(false) }
    gotoSignup() { this.props.actions.onboard.openOnboard(true) }

    render() {  
        return this.props.atSignup || this.props.atLogin ? (
            <div id="modal-container">
                <AccountModal
                    isOpen={this.props.atSignup}
                    title="Sign Up"
                    primary="Sign Up"
                    secondary="or login..."
                    handlePrimary={this.props.actions.api.signup}
                    handleSecondary={this.gotoLogin}
                />
                <AccountModal
                    isOpen={this.props.atLogin}
                    title="Log In"
                    primary="Log In"
                    secondary="or create an account..."
                    handlePrimary={this.props.actions.api.login}
                    handleSecondary={this.gotoSignup}
                />
            </div>
        ) : null
    }
}

const stateToProps = (state) => {
    return state.onboard
}

const dispatchToProps = (dispatch) => {
    return {
        actions: {
            api: bindActionCreators(apiActions, dispatch),
            onboard: bindActionCreators(onboardActions, dispatch) 
        } 
    }
}

export default connect(stateToProps, dispatchToProps)(ModalContainer)
