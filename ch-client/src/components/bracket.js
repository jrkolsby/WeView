import React from 'react'
import Choice from './choice.js'

const renderChoice = (props, index, round) => {
    const { bracket, choices, users, votes } = props
    if (index >= (bracket.length / 2)) {
        return null;
    }
    return (
        <>
            {renderChoice(props, index*2, round-1)}
            <div className={"match r" + round}>
                {bracket[index].length === 2 ? bracket[index].map((c, i) => {
                    const choice = choices[c]
                    if (choice && choice.user && users[choice.user]) {
                        return (
                            <Choice 
                                key={i}
                                title={choice.title}
                                user={users[choice.user].name}
                            />
                        )
                    }
                    return null
                }) : null}
            </div>
            {renderChoice(props, index*2+1, round-1)}
        </>
    )
}

const Bracket = (props) => (
    <div className="bracket">
        {renderChoice(props, 1, 3)}
    </div>
)

export default Bracket
