import React from 'react'
import {reduxForm, Form, Field} from 'redux-form'

const ChoiceForm = (props) => (
    <Field 
        name="choice" 
        component="input" 
        type="text"
        placeholder="Add a choice..."
        onChange={(e) => {
            props.handleChange(e.target.value)
        }}
    /> 
)

export default reduxForm()(ChoiceForm)
