import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import io from 'socket.io-client';
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

let socket = io('http://localhost:5000');

// Emit SOCKET_ actions to the socket
const thunkSocket = store => next => action => {
    if (action.type && action.type.indexOf("SOCKET_") === 0) {
        socket.emit('action', action)
    }
    next(action);
}

// Dispatch SOCKET_ actions from the socket
socket.on('action', (action) => {
    if (action.type && action.type.indexOf("SOCKET_") === 0) {
        store.dispatch(action)
    } 
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, thunkSocket)
);

ReactDOM.render((
    <Provider store={store}>
        <Choosy />
    </Provider>
    ), document.getElementById('root')
);

//registerServiceWorker();

