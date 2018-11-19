import React from 'react'

const Choice = (props) => {
    return (
        <div className="match">
            <span>{props.user}</span>
            <span>{props.title}</span>
        </div> 
    )
}

export default Choice
