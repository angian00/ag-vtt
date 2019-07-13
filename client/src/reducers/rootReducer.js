import socket from '../utils/websocket';


export default function(localState = initialLocalState(), action) {
	console.log(action);

	switch (action.type) {
		case 'MOVE_TOKEN':
			//TODO: local action validation
			socket.emit("gameAction", action);

			return localState;

		case 'SET_ZOOM':
			//TODO: save zoom in local state
			return localState;


		case 'STATE_UPDATE':
			console.log("Updating state");

			return {
				...action.state,
				viewMetadata: computeViewMetadata(action.state.mapMetadata, localState.viewMetadata.viewScale),
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


	return {
		mapMetadata: mapMetadata,
		viewMetadata: computeViewMetadata(mapMetadata, viewScale),
		visibleTiles: [],
		visitedTiles: [],
		tokenPositions: {dwarf: {x: -999, y: -999}}, //DEBUG
	};	

}

function computeViewMetadata(mapMetadata, viewScale) {
	return {
		viewScale: viewScale,
		mapScaleFactor: viewScale / mapMetadata.mapScale,
		tileSizePx: viewScale * mapMetadata.tileSizeFt,
	}
}

