import React  from 'react'

import Choice from '../components/choice'
import Bracket from '../components/bracket'

import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import debounce from 'lodash/debounce'

const DEBOUNCE_TIME = 100

const updateChoice = debounce((dispatch, id, newValue) => {
    dispatch(id, newValue)
}, DEBOUNCE_TIME)

const InputContainer = (props) => {
    const choices = Object.entries(props.state.choices);
    const size = choices.length;
    return (
        <div className="input-container">
        <div className="wrapper">
            <button className={"new" + (props.state.listID >= 0 ? " active" : "")}
                onClick={props.dispatch.createChoice}
            >+ Add Choice</button>
            <div className="choices">
		{choices.reverse().map(([id,c], i) => {
		return (
                    <Choice 
                        handleChange={(newTitle) => {
                            updateChoice(props.dispatch.updateChoice, id, newTitle)
                        }}
                        editing={props.state.editing === parseInt(id)}
                        user={props.state.users[c.user] ? 
			      props.state.users[c.user].name : "--"}
			win={ 0 > props.state.results[
				Math.floor(i/2)+(16-Math.ceil(size/2))] ||
			    i%2 === props.state.results[
				Math.floor(i/2)+(16-Math.ceil(size/2))]}
                        title={c.title}
                        key={id}
                    />
                )})}
            </div>
            <Bracket 
                bracket={props.state.bracket} 
		results={props.state.results}
                choices={props.state.choices}
                users={props.state.users}
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
