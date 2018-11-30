import React from 'react'

import ChoiceForm from './choiceForm'

const Choice = (props) => {
    return (
        <div className="choice"
            onClick={props.handleClick}>
            <span>{props.user}</span>
            {props.editing ? (
                <ChoiceForm 
                    form="choice"
                    handleChange={props.handleChange}
                />
            ) : (
                <p>{props.title}</p>
            )}
        </div> 
    )
}

export default Choice
