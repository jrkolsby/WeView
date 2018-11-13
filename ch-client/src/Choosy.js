import React, { Component } from 'react';

import "./style/reset.css"
import "./style/index.css"

import HeaderContainer from './containers/header-container'
import InputContainer from './containers/input-container'
import NavigationContainer from './containers/navigation-container'

/*
import VotingContainer from './containers/voting-container'
import LandingContainer from './containers/landing-container'
import ResultsContainer from './containers/results-container'
*/

class Choosy extends Component {

    render() {
        return (
            <div className="choosy">
                <HeaderContainer />
                <NavigationContainer>
                    <InputContainer />
                </NavigationContainer>
            </div>
        );
        /*
        return (
            <div className="choosy">
                <HeaderContainer />
                <NavigationContainer>
                    <LandingContainer />
                    <InputContainer />
                    <VotingContainer />
                    <ResultsContainer />
                </NavigationContainer>
            </div>
        );
        */
    }
}

export default Choosy;
