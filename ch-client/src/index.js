import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import socketio from 'socket.io-client';
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

import { SERVER } from './actions/request'

const socket = socketio(SERVER)

// Dispatch socket actions
socket.on('connection', (socket) => {
        console.log('Socket Connected') 
    })
    .on('action', (action) => {
        console.log('socket action', action)
        store.dispatch(action)
    })

// Intercept JOIN_ROOM actions
const room = store => next => action => {
    switch (action.type) {
        case "JOIN_LIST":
            socket.emit('join', action.payload.url)
            break;

        case "LEAVE_LIST":
            socket.emit('leave', action.payload.url)
            break;

        default: break;
    } 

    next(action);
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, room)
);

ReactDOM.render((
    <Provider store={store}>
        <Choosy />
    </Provider>
    ), document.getElementById('root')
);

//registerServiceWorker();

