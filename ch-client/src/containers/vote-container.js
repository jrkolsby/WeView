import React from 'react'

import Choice from '../components/choice'

import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export const VoteContainer = (props) => {
    let matchIndex = 1
    return (
	<div className="vote-container">
	<div className="wrapper">
	    {props.state.round < 0 || 
	    props.state.bracket[
		props.state.round[
		    props.state.round.length-1]].length < 2 ? (
		<div className="404">
		<button
		    onClick={() => { props.dispatch.gotoModal(3) }}>Create New Decision
		</button>
		</div>
	    ) : props.state.round.map((r) => {
		return props.state.bracket[r].length < 2 ? null : (
		    <div className="vote">
		    <h3>Match {matchIndex++}</h3>
		    {props.state.bracket[r].map((c, i) => {
			const choice = props.state.choices[c]
			const vote = props.state.votes[r]
			console.log(props.state)
			return (
			    <Choice 
				key={i}
				win={i === props.state.votes[r]}
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
}

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
            ...bindActionCreators(listActions, dispatch),
            ...bindActionCreators(navActions, dispatch) 
        }
    }
}

export default connect(mapState, mapDispatch)(VoteContainer)
