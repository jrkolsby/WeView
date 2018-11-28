import React, { Component } from 'react';

import * as userActions from './actions/user'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import "./style/reset.css"
import "./style/index.css"

import VoteContainer from './containers/vote-container'
import InputContainer from './containers/input-container'
import HeaderContainer from './containers/header-container'
import NavigationContainer from './containers/navigation-container'

class Choosy extends Component {
    constructor(props) {
        super(props)
        window.addEventListener('beforeunload', props.dispatch.logout)
    }
        
    render() {
        return (
            <div className="choosy">
                <HeaderContainer form="nav" />
                <NavigationContainer>
                    <InputContainer form="input"/>
                    <VoteContainer />
                </NavigationContainer>
            </div>
        )
    }
}
    
const mapDispatch = (dispatch) => {
    return {
        dispatch: {
            ...bindActionCreators(userActions, dispatch), 
        }
    }
}
export default connect(mapDispatch)(Choosy);
