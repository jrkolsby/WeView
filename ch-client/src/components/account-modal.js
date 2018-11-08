import React from 'react'
import Modal from './modal'

class AccountModal extends Modal {
    constructor(props) {
        super(props)
        this.send = this.send.bind(this)
    }

    send() {
        this.props.handlePrimary("user", "pass")
    }

    render() {
        return this.props.isOpen ? (
            <div className='account modal'>
                <h1>{this.props.title}</h1>

                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>

                <button onClick={this.send}>
                    {this.props.primary}</button>

                <a onClick={this.props.handleSecondary}>
                    {this.props.secondary}</a>
            </div> 
        ) : null
    }
}

export default AccountModal
