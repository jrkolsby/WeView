import React from 'react'

const Choice = (props) => {
    return (
        <div className="match">
            <span>{props.user}</span>
            {props.title}
        </div> 
    )
}

export default Choice
