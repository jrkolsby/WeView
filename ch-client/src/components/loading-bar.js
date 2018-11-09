import React, {Component} from 'react'

class LoadingBar extends Component {
    render() {
        return this.props.visible ? (
            <div className='loading'>Loading</div>
        ) : null
    }
}

export default LoadingBar
