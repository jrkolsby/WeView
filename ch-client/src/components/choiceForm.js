import React from 'react'
import {reduxForm, Field} from 'redux-form'

const ChoiceInputForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.active ? (
                <Field 
                    name="choice" 
                    component="input" 
                    type="text"
                    placeholder="Add a choice..."
                    onChange={(e) => {
                        props.handleChange(e.target.value)
                    }}
                /> 
            ) : (
                <button onclick={() => {
                    props.dispatch.newChoice(2) 
                }}>vote!</button> 
            )}
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({form: "choice"})(ChoiceInputForm)
