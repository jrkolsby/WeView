import React from 'react'
import {reduxForm, Form, Field} from 'redux-form'

const ChoiceInputForm = (props) => (
    <Form className={"choice" + (props.active ? " active" : "")}
        onSubmit={props.handleSubmit}>
        <Field 
            name="choice" 
            component="input" 
            type="text"
            placeholder="Add a choice..."
            onChange={props.handleChange}
        /> 
        <button type="submit"></button>
    </Form>
)

export default reduxForm()(ChoiceInputForm)
