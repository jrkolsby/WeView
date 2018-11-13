import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import io from 'socket.io-client';
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

let socket = io('http://localhost:5000');

socket.on('action', (action) => {
    store.dispatch(action)
})

// Custom middleware to emit SERVER actions from the socket
const flaskSocket = store => next => action => {
    if (action.type && action.type.indexOf("SERVER") === 0) {
        socket.emit('action', action)
    }
    next(action);
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, flaskSocket)
);

ReactDOM.render((
    <Provider store={store}>
        <Choosy />
    </Provider>
    ), document.getElementById('root')
);

//registerServiceWorker();

