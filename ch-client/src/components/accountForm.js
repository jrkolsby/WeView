import React from 'react'
import {reduxForm, Field} from 'redux-form'

export const AccountForm = (props) => (
    <form className="account modal"
        onSubmit={props.handleSubmit}
    >
        <h3>{props.title}</h3>
        <Field 
            name={props.name + "User"} 
            component="input" 
            type="text"
            placeholder="Username..."
        />
        <Field 
            name={props.name + "Pass"} 
            component="input" 
            type="password"
            placeholder="Password..."
        />
        <button type="submit">{props.primary}</button>
        <a href="." onClick={(e) => {
            e.preventDefault()
            props.handleSecondary()
        }}>{props.secondary}</a>    
    </form>
)

export default reduxForm({form: "account"})(AccountForm)
