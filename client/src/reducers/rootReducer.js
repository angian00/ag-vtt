import { combineReducers } from "redux";

import socket from '../utils/websocket';


export default function customReducer(localState = initialLocalState(), action) {
	//console.log(action);

	switch (action.type) {
		// ------ local actions ------
		case 'SET_ZOOM':
			return {
				...localState,
				viewMetadata: computeViewMetadata(localState.mapMetadata, action.viewScale),
			};

		case 'RUN_TOOL':
			switch (action.tool) {
				case 'DiceRoller':
					return {
						...localState,
						isDiceRollerOpen: true,
					};
				default:
					return localState;
			}

		case 'CLOSE_TOOL':
			switch (action.tool) {
				case 'DiceRoller':
					return {
						...localState,
						isDiceRollerOpen: false,
					};
				default:
					return localState;
			}

		// ------ auth actions ------
		case 'LOGIN_REQUEST':
			console.log("rootReducer - LOGIN_REQUEST");

			return {
				...localState,
				loginStatus: "LOGGED_IN", //TODO: LOGGING_IN status
				user: action.user,
			}

		case 'LOGIN_SUCCESS':
			console.log("rootReducer - LOGIN_SUCCESS");
			
			return {
				...localState,
				loginStatus: "LOGGED_IN",
				user: action.user,
			}

		case 'LOGOUT':
			console.log("rootReducer - LOGOUT");
			
			return {
				...localState,
				loginStatus: "LOGGED_OUT",
				user: null,
			}


		// ------ game actions ------
		case 'MOVE_TOKEN':
			//TODO: local validation
			socket.emit("gameAction", action);
			return localState;


		// ------ chat actions ------
		case 'CHAT_MESSAGE':
			socket.emit("chatMessage", {sender: localState.user.name, text: action.text});
			return localState;

		case 'ROLL_DICE':
			socket.emit("diceRoll", {sender: localState.user.name, ...action});
			return {
				...localState,
				isDiceRollerOpen: false,
			};


		// ------ state update from server ------
		case 'STATE_UPDATE':
			console.log("Updating state");
			console.log(localState);

			return {
				...localState,
				...action.state,
				viewMetadata: computeViewMetadata(action.state.mapMetadata, localState.viewMetadata.viewScale),
			};

		case 'CHAT_EVENT':
			console.log("CHAT_EVENT");
			console.log(localState);
			return {
				...localState,
				msgQueue: [
					...localState.msgQueue, 
					action.eventData
				]
			};

		default:
			return localState;
	}
}


function initialLocalState() {
	let mapMetadata = {
		mapW: 0,
		mapH: 0,
		mapScale: 30,
		tileSizeFt: 3,
		nTilesX: 0,
		nTilesY: 0,
	}

	let viewScale = 30;


	let user = localStorage.getItem("user");
	let loginStatus;	
	if (user) {
		loginStatus = "LOGGED_IN";
	} else {
		loginStatus = "LOGGED_OUT";
	}

	return {
		loginStatus: loginStatus,
		user: user,
		mapMetadata: mapMetadata,
		viewMetadata: computeViewMetadata(mapMetadata, viewScale),
		visibleTiles: [],
		visitedTiles: [],
		tokenPositions: {dwarf: {x: -999, y: -999}}, //DEBUG
		msgQueue: [],
	};	

}

function computeViewMetadata(mapMetadata, viewScale) {
	return {
		viewScale: viewScale,
		mapScaleFactor: viewScale / mapMetadata.mapScale,
		tileSizePx: viewScale * mapMetadata.tileSizeFt,
	}
}


//export default combineReducers({
  //router: connectRouter(history),
//  customReducer,
//});
