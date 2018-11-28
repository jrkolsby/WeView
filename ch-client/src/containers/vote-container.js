import React from 'react'

import Choice from '../components/choice'

import * as listActions from '../actions/list'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export const VoteContainer = (props) => (
    <div className="vote-container">
    <div className="wrapper">
        <Choice 
            editing={false}
            user="Person!"
            title="Choice A"
        /> 
        <Choice 
            editing={false}
            user="Person!"
            title="Choice B"
        /> 
    </div>
    </div>
)

export default VoteContainer
