import React, {Component} from 'react'

import {connect} from 'react-redux';
import * as actionCreators from '../actions/onboard'

import AccountModal from '../components/account-modal'

class ModalContainer extends Component {
    constructor(props) {
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this)
        this.gotoSignup = this.gotoSignup.bind(this)
    }

    gotoLogin() { this.props.openOnboard(false) }
    gotoSignup() { this.props.openOnboard(true) }

    render() {  
        return this.props.onboard.signup ||
            this.props.onboard.login ? (
            <div id="modal-container">
                <AccountModal
                    isOpen={this.props.onboard.signup}
                    fields={[{
                        placeholder: "Username"
                    },{
                        placeholder: "Password",
                        pass: true
                    }]}
                    title="Sign Up"
                    primary="Sign Up"
                    secondary="or login..."
                    handlePrimary={this.props.signup}
                    handleSecondary={this.gotoLogin}
                />
                <AccountModal
                    isOpen={this.props.onboard.login}
                    fields={[{
                        placeholder: "Username"
                    },{
                        placeholder: "Password",
                        pass: true
                    }]}
                    title="Log In"
                    primary="Log In"
                    secondary="or create an account..."
                    handlePrimary={this.props.login}
                    handleSecondary={this.gotoSignup}
                />
            </div>
        ) : null
    }
}

const mapStateToProps = (state) => {
    return {
        onboard: state.onboard
    }
}

export default connect(mapStateToProps, actionCreators)(ModalContainer)
