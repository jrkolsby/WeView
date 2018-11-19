import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import socket from 'socket.io-client';
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

import { SERVER } from './actions/request'

socket(SERVER)
    .on('action', (action) => {
        store.dispatch(action)
    })

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render((
    <Provider store={store}>
        <Choosy />
    </Provider>
    ), document.getElementById('root')
);

//registerServiceWorker();

