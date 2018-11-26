import React from 'react'
import {reduxForm, Form, Field} from 'redux-form'

export const AccountForm = (props) => (
    <Form className={"account modal" + (props.active ? " active" : "")}
        onSubmit={props.handleSubmit}
    >
        <h3>{props.title}</h3>
        <Field 
            name="user"
            component="input" 
            type="text"
            placeholder="Username..."
        />
        <Field 
            name="pass"
            component="input" 
            type="password"
            placeholder="Password..."
        />
        <button type="submit">{props.primary}</button>
        <a href="." onClick={(e) => {
            e.preventDefault()
            props.handleSecondary()
        }}>{props.secondary}</a>
    </Form>
)

export default reduxForm()(AccountForm)
