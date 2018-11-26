import React  from 'react'

import ChoiceForm from '../components/choiceForm'
import Choice from '../components/choice'

import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import debounce from 'lodash/debounce'

const DEBOUNCE_TIME = 1000

const updateChoice = debounce((dispatch, id, newValue) => {
    dispatch(id, newValue)
}, DEBOUNCE_TIME)

const InputContainer = (props) => {
    console.log(props.state.form)
    return (
        <div className="input-container">
        <div className="wrapper">
            <div className="choices">
                <button onClick={() => {
                    props.dispatch.createChoice("") 
                }}>New</button>
                {Object.entries(props.state.choices).map(([id,c]) =>
                    props.state.editing === parseInt(id) ? (
                        <ChoiceForm
                            key={id}
                            form="choice"
                            handleChange={() => {
                                updateChoice(props.dispatch.updateChoice, id,
                                             props.state.form.choice.values.choice) 
                            }}
                        />
                    ) : (
                        <Choice 
                            user={props.state.users[c.user].name}
                            title={c.title}
                            key={id}
                        />
                ))}
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
            form: state.form
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
