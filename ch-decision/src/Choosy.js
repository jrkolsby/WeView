import React, { Component } from 'react';

import "../style/reset.css"
import "../style/index.css"

import BracketContainer from '../containers/bracket'

class Choosy extends Component {

    render() {
        return (
            <div className="choosy">
                <HeaderContainer />
                <BracketContainer />
                <InputContainer />
            </div>
        );
    }
}

export default Choosy;
