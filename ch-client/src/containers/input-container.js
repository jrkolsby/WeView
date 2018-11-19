import React  from 'react'

import ChoiceForm from '../components/choiceForm'
import Choice from '../components/choice'

import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const InputContainer = (props) => {
    return (
        <div className="input-container">
            <div className="matches">
                {Object.entries(props.state.choices).map(([id,c]) => (
                    <Choice 
                        user={props.state.users[c.user].name}
                        title={c.title}
                        key={id}
                    />
                ))}
            </div>
            <div className="controls">
                <ChoiceForm
                    onSubmit={(form) => {
                        props.dispatch.createChoice(form.choice)
                    }}
                />
                <button onClick={() => {
                    props.dispatch.gotoPage(2) 
                }}>Vote!</button>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        state: {
            ...state.list,
            ...state.nav
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
