import React from 'react'

export default (props) => {  
    return (
        <div className="suggest-input">
            <div className="suggestions">
                {props.suggestions.map((s, i) => 
                    <li>{s}</li>
                )}
            </div>
            <input 
                type="text" 
                value={props.value} 
                placeholder="Type a choice..." 
                onChange={(e) => {props.handleChange(e.target.value)}} />
        </div>
    )
}
