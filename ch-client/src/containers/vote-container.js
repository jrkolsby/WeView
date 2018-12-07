import React from 'react'

import Choice from '../components/choice'

import * as listActions from '../actions/list'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export const VoteContainer = (props) => (
    <div className="vote-container">
    <div className="wrapper">
        {props.state.voteID < 0 ? (
	    <div className="404">Waiting for next round</div>
	) : props.state.bracket[props.state.voteID].map((c, i) => {
                const choice = props.state.choices[c]
                return (
                    <Choice 
                        key={i}
                        user={props.state.users[choice.user] ? 
			      props.state.users[choice.user].name : "--"}
                        title={choice.title}
                        handleClick={() => {
                            props.dispatch.createVote(props.state.voteID, i)
                        }}
                    />
                )
        
        })}
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
