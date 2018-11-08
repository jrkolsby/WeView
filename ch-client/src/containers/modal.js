import React, {Component} from 'react'

import {connect} from 'react-redux';
import * as actionCreators from '../actions'

import SignupModal from '../components/signup'

class ModalContainer extends Component {
    constructor(props) {
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(chunkIndex) {
        //console.log('handle select', chunkIndex)
        this.props.jumpToChunk(chunkIndex)
    }

    render() {  
        //console.log('editor chunk', this.props)
        return (
            <SignupModal

                // State Props
                isOpen={this.props.signup}

                // Action creators
                handleOpen={this.props.signup}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        editor: state.editor,
        player: state.player
    }
}

let connection = connect(mapStateToProps, actionCreators)(ModalContainer)

console.log(connection)

export default connection
