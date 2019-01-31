import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import socketio from 'socket.io-client';
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

import { SERVER, attachCreds } from './actions/request'

const socket = socketio(window.location.href, {
    path: SERVER + 'socket.io/'
})

socket.on('connect', (action) => {
    console.log('connected to socket', action)
})

socket.on('disconnect', (action) => {
    console.log('disconnected from socket', action)
})

socket.on('*', (e,d) => {
    console.log("event", e)
    console.log("data", d)
})

// Dispatch socket actions
socket.on('action', (action) => {
    console.log('socket action', action)
    store.dispatch(action)
})

// Intercept JOIN_ROOM actions
const room = store => next => action => {
    switch (action.type) {
        case "LOGOUT":
            socket.emit('leave', attachCreds(action, store.getState()))
            break;

        case "JOIN_LIST":
	    console.log("emitting join", store.getState().list)
            if (store.getState().list.listID >= 0) {
                socket.emit('leave', attachCreds(action, store.getState()))
            }
            socket.emit('join', attachCreds(action, store.getState()))
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

