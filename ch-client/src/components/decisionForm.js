import React from 'react'
import {reduxForm, Field, Form} from 'redux-form'

export const AccountForm = (props) => (
    <Form className="account modal"
        onSubmit={props.handleSubmit}
    >
        <h3>{props.title}</h3>
        <Field 
            name="name"
            component="input" 
            type="text"
            placeholder="Give it a name..."
        />
        <button type="submit">{props.primary}</button>
        <a href="." onClick={(e) => {
            e.preventDefault()
            props.handleSecondary()
        }}>{props.secondary}</a>    
    </Form>
)

export default reduxForm({form: "account"})(AccountForm)
