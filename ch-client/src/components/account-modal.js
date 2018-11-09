import React from 'react'
import Modal from './modal'

class AccountModal extends Modal {
    constructor(props) {
        super(props)
        this.send = this.send.bind(this)
        this.state = {user: "", pass: ""}
    }

    send() {
        this.props.handlePrimary(this.state.user, this.state.pass)
    }

    render() {
        return this.props.isOpen ? (
            <div className='account modal'>
                <h1>{this.props.title}</h1>

                <input type="text"
                    placeholder="Username"
                    value={this.state.user}
                    onChange={(e) => {
                        this.setState({user: e.target.value})}}
                />
                <input type="password" 
                    placeholder="Password"
                    value={this.state.pass}
                    onChange={(e) => {
                        this.setState({pass: e.target.value})}}
                />

                <button onClick={this.send}>
                    {this.props.primary}</button>

                <a onClick={this.props.handleSecondary}>
                    {this.props.secondary}</a>
            </div> 
        ) : null
    }
}

export default AccountModal
