import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers'

import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

//import registerServiceWorker from './registerServiceWorker';

import ModalContainer from './containers/modal'

import "./style/reset.css"
import "./style/index.css"

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ModalContainer />
    </Provider>,
    document.getElementById('root')
);

//registerServiceWorker();

