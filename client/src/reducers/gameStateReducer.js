import socket from '../utils/websocket';


export default function gameStateReducer(state = initialState(), action) {
	switch (action.type) {
		case 'MOVE_TOKEN':
			//TODO: local validation
			socket.emit("gameAction", action);
			return state;


		case 'STATE_UPDATE':
			console.log("Updating state");
			return action.state;

		default:
			return state;
	}
}


function initialState() {
	let mapMetadata = {
		mapW: 0,
		mapH: 0,
		mapScale: 30,
		tileSizeFt: 3,
		nTilesX: 0,
		nTilesY: 0,
	}

	return {
		mapMetadata: mapMetadata,
		visibleTiles: [],
		visitedTiles: [],
		tokenPositions: {dwarf: {x: -999, y: -999}}, //DEBUG
	};	
}

