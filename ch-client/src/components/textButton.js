import React from 'react'

export default (props) => (
    <button
        onClick={props.handleClick}
    >{props.message}</button>
)
