import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import App from './App';
import * as serviceWorker from './serviceWorker';
import socket from './utils/websocket';
//import rootReducer from './reducers';
import rootReducer from './reducers/rootReducer';



let store = createStore(rootReducer);
socket.on("stateUpdate", (payload) => 
	store.dispatch({type: "STATE_UPDATE", state: payload }) 
);

let chatEvents = ["playerJoined", "chatMessage", "diceRoll"];
for (let eventType of chatEvents) {
	socket.on(eventType, payload => {
		store.dispatch({type: "CHAT_EVENT", eventData: {msgType: eventType, ...payload}});
	});
}

//TODO: send playerJoined

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
