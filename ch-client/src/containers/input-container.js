import React, {Component} from 'react'
import {connect} from 'react-redux';

import SuggestInput from '../components/suggestInput.js'
import TextButton from '../components/textButton.js'
import IconButton from '../components/iconButton.js'

import * as gameActions from '../actions/game'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';

const InputContainer = (props) => {
    console.log(props)
    return (
        <div className="input-container">
            <SuggestInput 
                value={props.inputValue}
                suggestions={props.choiceSuggestions}
                handleChange={props.getSuggestions}
                handleSubmit={props.submit} 
            />

            <IconButton className="shuffle"
                handleClick={props.generateInput} />

            <IconButton className="submit"
                handleClick={() => {props.addChoice(props.inputValue)}} />

            <TextButton message="vote" 
                handleClick={() => {props.navigateTo(2)}}/>
        </div>
    )
}

const mapState = (state) => {
    return {
        ...state.game,
        ...state.nav
    }
}

const mapDispatch = (dispatch) => {
    return {
        ...bindActionCreators(navActions, dispatch), 
        ...bindActionCreators(gameActions, dispatch)
    }
}

export default connect(mapState, mapDispatch)(InputContainer)
