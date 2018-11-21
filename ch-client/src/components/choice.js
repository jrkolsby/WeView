import React from 'react'

const Choice = (props) => {
    return (
        <div className="choice">
            <span className="user">{props.user}</span>
            <span className="title">{props.title}</span>
        </div> 
    )
}

export default Choice
