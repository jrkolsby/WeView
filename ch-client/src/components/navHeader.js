import React from 'react'

export default (props) => (
    <div className="header">
        <div className="icon back"
            onClick={props.handleBack}
        ></div>
        <h1>{props.title}</h1>
    </div>

)
