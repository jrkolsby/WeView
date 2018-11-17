import React from 'react'
import {reduxForm, Field} from 'redux-form'

const ChoiceInputForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field 
                name="choice" 
                component="input" 
                type="text"
                placeholder="Add a choice..."
                onChange={(e) => {
                    props.handleChange(e.target.value)
                }}
            />
            <button onClick={(e) => {
                e.preventDefault()
                props.handleShuffle()
            }}>Shuffle</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default reduxForm({form: "choice"})(ChoiceInputForm)
