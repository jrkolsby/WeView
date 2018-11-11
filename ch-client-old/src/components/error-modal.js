import React from 'react'
import Modal from './modal'

class ErrorModal extends Modal {
    render() {
        return this.props.visible ? null : (
            <div className='error modal'>
                {this.props.message}
            </div> 
        )
    }
}

export default ErrorModal
