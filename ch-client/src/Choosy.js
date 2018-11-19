import React from 'react';

import "./style/reset.css"
import "./style/index.css"

import VoteContainer from './containers/vote-container'
import InputContainer from './containers/input-container'
import HeaderContainer from './containers/header-container'
import NavigationContainer from './containers/navigation-container'

export const Choosy = (props) => (
    <div className="choosy">
        <HeaderContainer />
        <NavigationContainer>
            <InputContainer />
            <VoteContainer />
        </NavigationContainer>
    </div>
)

export default Choosy;
