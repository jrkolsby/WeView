import React, {Component} from 'react'

import {connect} from 'react-redux';

import ErrorModal from '../components/error-modal'
import LoadingBar from '../components/loading-bar'

class StatusContainer extends Component {
    render() {
        return (
            <>
                <LoadingBar 
                    visible={this.props.loading}
                />
                <ErrorModal
                    visible={this.props.ok}
                    message={this.props.error}
                />
            </>
        ) 
    }
}

const mapStateToProps = (state) => {
    return state.api
}

export default connect(mapStateToProps)(StatusContainer)
