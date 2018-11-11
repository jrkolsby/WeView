import React, { Component } from 'react';

import "../style/reset.css"
import "../style/index.css"

import OnboardContainer from './onboard'
import StatusContainer from './status'
import LobbyContainer from './lobby'
import RoomContainer from './room'

class Choosy extends Component {
    render() {
        return (
            <div className="choosy">
                <StatusContainer />
                <OnboardContainer />
                <LobbyContainer />
                <RoomContainer />
            </div>
        );
    }
}

export default Choosy;
