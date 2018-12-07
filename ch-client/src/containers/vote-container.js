import React from 'react'

import Choice from '../components/choice'

import * as listActions from '../actions/list'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export const VoteContainer = (props) => (
    <div className="vote-container">
    <div className="wrapper">
        {props.state.round < 0 ? (
	    <div className="404">Waiting for first round</div>
	) : props.state.round.map((r) => {
	    return props.state.bracket[r].length < 2 ? "Waiting for next round..." : (
		<div className="vote">
		{props.state.bracket[r].map((c, i) => {
		    const choice = props.state.choices[c]
		    return (
			<Choice 
			    key={i}
			    user={props.state.users[choice.user] ? 
				  props.state.users[choice.user].name : "--"}
			    title={choice.title}
			    handleClick={() => {
				props.dispatch.createVote(r, i)
			    }}
			/>
		    )
		})}
		</div>
	    )}
	)}
    </div>
    </div>
)

const mapState = (state) => {
    return {
        state: {
            ...state.list,
        }
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatch: {
            ...bindActionCreators(listActions, dispatch) 
        }
    }
}

export default connect(mapState, mapDispatch)(VoteContainer)
