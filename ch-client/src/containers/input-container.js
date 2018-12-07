import React  from 'react'

import Choice from '../components/choice'
import Bracket from '../components/bracket'

import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import debounce from 'lodash/debounce'

const DEBOUNCE_TIME = 100
const BRACKET_SIZE = 16

const updateChoice = debounce((dispatch, id, newValue) => {
    dispatch(id, newValue)
}, DEBOUNCE_TIME)

const renderFirstRound = (props) => {
    const { bracket, users, choices, results} = props.state

    const size = bracket.length
    const slice = bracket.slice(size/2, size)
    const sliceResults = results.slice(size/2, size)

    console.log('bracket', bracket)
    console.log('slice', slice)

    let firstRound = []

    for (var i = 0; i < slice.length; i++) {
	var match = slice[i]
	for (var j = match.length-1; j >= 0; j--) {
	    let c = match[j]
	    var choice = choices[c]
	    const user = users[choice.user] ? 
		users[choice.user].name : "--"
	    firstRound.push(
		<Choice 
		    handleChange={(newTitle) => {
			updateChoice(props.dispatch.updateChoice, c, newTitle)
		    }}
		    editing={props.state.editing === c}
		    user={user}
		    win={sliceResults[i] < 0 || j === sliceResults[i]}
		    title={choice.title}
		    key={c}
		/>
	    )
	}
    }

    return firstRound
}

const InputContainer = (props) => {
    console.log(props.state.editing)
    return (
        <div className="input-container">
        <div className="wrapper">
            <button className={"new" + (props.state.listID >= 0 ? " active" : "")}
                onClick={props.dispatch.createChoice}
            >+ Add Choice</button>
            <div className="choices">
		{renderFirstRound(props)}
            </div>
            <Bracket 
                bracket={props.state.bracket} 
		results={props.state.results}
                choices={props.state.choices}
                users={props.state.users}
		hideAfter={props.state.round[0]}
            />
        </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        state: {
            ...state.list,
            ...state.nav,
            loggedIn: state.user.loggedIn
        }
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatch: {
            ...bindActionCreators(navActions, dispatch), 
            ...bindActionCreators(listActions, dispatch) 
        }
    }
}

export default connect(mapState, mapDispatch)(InputContainer)
