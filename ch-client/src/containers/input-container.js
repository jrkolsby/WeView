import React  from 'react'

import Choice from '../components/choice'

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
    console.log(props.state)
    return (
        <div className="input-container">
        <div className="wrapper">
            <div className="choices">
                <button className={"new" + (props.state.listID >= 0 ? " active" : "")}
                    onClick={props.dispatch.createChoice}
                >+ Add Choice</button>
                {Object.entries(props.state.choices).reverse().map(([id,c]) =>
                    <Choice 
                        handleChange={(newTitle) => {
                            updateChoice(props.dispatch.updateChoice, id, newTitle)
                        }}
                        editing={props.state.editing === parseInt(id)}
                        user={props.state.users[c.user].name}
                        title={c.title}
                        key={id}
                    />
                )}
            </div>
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
