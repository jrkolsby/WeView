import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import Choosy from './Choosy'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Choosy />
    </Provider>,
    document.getElementById('root')
);

//registerServiceWorker();
