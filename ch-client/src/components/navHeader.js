import React from 'react'

export default (props) => (
    <div className="header">
        <h1>{props.title}</h1>
        <div className="icon back"
            onClick={props.handleBack}
        ></div>
    </div>

)
