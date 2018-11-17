import React from 'react';

import "./style/reset.css"
import "./style/index.css"

import LandingContainer from './containers/landing-container'
import HeaderContainer from './containers/header-container'
import ChoiceInputContainer from './containers/choice-input-container'
import NavigationContainer from './containers/navigation-container'

/*
import VoteContainer from './containers/vote-container'
import ResultsContainer from './containers/results-container'
*/

export const Choosy = (props) => (

    <div className="choosy">
        <HeaderContainer />
        <NavigationContainer>
            <LandingContainer />
            <ChoiceInputContainer />
        </NavigationContainer>
    </div>
)

export default Choosy;
