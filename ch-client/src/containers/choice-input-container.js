import React  from 'react'

import ChoiceInputForm from '../components/choiceInputForm'
import Choice from '../components/choice'

import * as roomActions from '../actions/room'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const ChoiceInputContainer = (props) => {
    return (
        <div className="input-container">
            <div className="matches">
                {Object.keys(props.state.matches).map((i) => {
                    const pair = props.state.matches[i]
                    const a = props.state.choices[pair[0]]
                    const b = props.state.choices[pair[1]]
                    return (
                        <div key={i} className="match">
                            <Choice 
                                user={a.user}
                                title={a.title}
                                key={a.id}
                            />
                            <Choice 
                                user={b.user}
                                title={b.title}
                                key={b.id}
                            />
                        </div>
                    )}
                )}
            </div>
            <div className="controls">
                <ChoiceInputForm
                    handleChange={props.dispatch.updateChoice}
                    handleShuffle={props.dispatch.shuffleChoice}
                    onSubmit={(form) => {
                        props.dispatch.addChoice() 
                    }}
                />
                <button onClick={props.dispatch.startVote}>Vote!</button>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        state: {
            ...state.room,
            ...state.nav
        }
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatch: {
            ...bindActionCreators(navActions, dispatch), 
            ...bindActionCreators(roomActions, dispatch) 
        }
    }
}

export default connect(mapState, mapDispatch)(ChoiceInputContainer)
