import React from 'react'
import {reduxForm, Field, Form} from 'redux-form'

export const DecisionForm = (props) => (
    <Form className={"decision modal" + (props.active ? " active" : "")}
        onSubmit={props.handleSubmit}
    >
        <h2>{props.title}</h2>
        <Field 
            name="name"
            component="input" 
            type="text"
            placeholder={props.placeholder}
        />
        <button type="submit">{props.primary}</button>
        <a href="." onClick={(e) => {
            e.preventDefault()
            props.handleSecondary()
        }}>{props.secondary}</a>    
    </Form>
)

export default reduxForm()(DecisionForm)
