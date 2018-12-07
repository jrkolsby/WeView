import React from 'react'
import Choice from './choice.js'

const renderChoice = (props, index, round) => {
    const { bracket, choices, users, results } = props
    if (index >= (bracket.length / 2)) {
        return null;
    }
    return (
        <>
            {renderChoice(props, index*2, round-1)}
	    {bracket[index].length > 1 ? (
		<div className={"match r" + round}>
		    {bracket[index].map((c, i) => {
			const choice = choices[c]
			if (choice && choice.user && users[choice.user]) {
			    return results[index] < 0 ? (
				<Choice 
				    key={i}
				    win={false}
				    title={"???"}
				    user={"???"}
				/>
			    ) : (
				<Choice 
				    key={i}
				    win={i === results[index]}
				    title={choice.title}
				    user={users[choice.user].name}
				/>
			    )
			}
			return null
		    })}
		</div>
	    ) : null}
            {renderChoice(props, index*2+1, round-1)}
        </>
    )
}

const Bracket = (props) => (
    <div className="bracket">
        {renderChoice(props, 1, Math.log2(props.bracket.length)-1)}
    </div>
)

export default Bracket
