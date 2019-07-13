import React from 'react';
import ReactDOM from 'react-dom';
//import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import createSocketIoMiddleware from 'redux-socket.io';


import App from './App';
import * as serviceWorker from './serviceWorker';
import socket from './utils/websocket';
//import rootReducer from './reducers';
import rootReducer from './reducers/rootReducer';



let store = createStore(rootReducer);
socket.on("stateUpdate", (payload) => 
	store.dispatch({type: "STATE_UPDATE", state: payload }) 
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
