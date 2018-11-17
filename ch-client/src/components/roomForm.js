import React from 'react'
import {reduxForm, Field} from 'redux-form'

export const RoomForm = (props) => (
    <form className="room modal"
        onSubmit={props.handleSubmit}
    >
        <h3>{props.title}</h3>
        <Field 
            name={props.name + "Title"} 
            component="input" 
            type="text"
            placeholder="Decision Title..."
        />
        <Field 
            name={props.name + "Id"}
            component="input" 
            type="text"
            placeholder="Room ID"
        />
        <button type="submit">{props.primary}</button>
        <a href="." onClick={(e) => {
            e.preventDefault()
            props.handleSecondary()
        }}>{props.secondary}</a>    
    </form>
)

export default reduxForm({form: "room"})(RoomForm)
