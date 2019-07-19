import React, {Component} from 'react'
import Choice from './choice.js'

const renderChoice = (props, index, round, isFinal) => {
    const { bracket, choices, users, results, hideAfter } = props
    const stillFinal = isFinal && (bracket[index].length < 2)
    return index >= (bracket.length / 2) ? null : (
        <>
            {renderChoice(props, index*2, round-1, stillFinal)}
	    {bracket[index].length > 1 ? (
		<div className={"match " + (isFinal ? "final " : "") + "r" + round}>
		    {bracket[index].map((c, i) => {
			const choice = choices[c]
			if (choice && choice.user && users[choice.user]) {
			    return index < hideAfter ? (
				<Choice 
				    key={i}
				    win={false}
				    title={"???"}
				    user={"???"}
				/>
			    ) : (
				<Choice 
				    key={i}
				    win={results[index] < 0 || i === results[index]}
				    title={choice.title}
				    user={users[choice.user].name}
				/>
			    )
			}
			return null
		    })}
		</div>
	    ) : null}
            {renderChoice(props, index*2+1, round-1, stillFinal)}
        </>
    )
}

class Bracket extends Component {
    shouldComponentUpdate(nextProps) {
	return true
	return this.props.bracket !== nextProps.bracket ||
	       this.props.results !== nextProps.results ||
	       this.props.choices !== nextProps.choices
    }

    render() {
	return (
	    <div className="bracket">
		{renderChoice(this.props, 1, Math.log2(this.props.bracket.length)-1, true)}
	    </div>
	) 
    }
}

export default Bracket
