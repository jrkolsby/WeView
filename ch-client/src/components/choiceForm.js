import React from 'react'
import {reduxForm, Field} from 'redux-form'

const ChoiceInputForm = (props) => {
    return props.active ? (
        <form className="choice"
            onSubmit={props.handleSubmit}>
            <Field 
                name="choice" 
                component="input" 
                type="text"
                placeholder="Add a choice..."
                onChange={(e) => {
                    props.handleChange(e.target.value)
                }}
            /> 
            <button type="submit"></button>
        </form>
    ) : ( 
        <button className="new-choice" onClick={() => {
            props.handleCreate() 
        }}>Add Choice</button> 
    )
}

export default reduxForm({form: "choice"})(ChoiceInputForm)
