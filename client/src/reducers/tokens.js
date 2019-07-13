import _ from "lodash";

import socket from '../utils/websocket';



function initialLocalState() {
	let mapMetadata = {};

	//--proper map metadata

	//in pixels
	mapMetadata.mapW = 1440;
	mapMetadata.mapH = 810;

	// in pixels/ft
	mapMetadata.mapScale = 30;
	//

	//--view/game metadata
	mapMetadata.tileSizeFt = 3;
	mapMetadata.nTilesX = Math.ceil(mapMetadata.mapW / (mapMetadata.mapScale*mapMetadata.tileSizeFt));
	mapMetadata.nTilesY = Math.ceil(mapMetadata.mapH / (mapMetadata.mapScale*mapMetadata.tileSizeFt));

	mapMetadata.zoomScale = 30;
	//mapMetadata.zoomScale = 15;

	updateFromZoomScale(mapMetadata);


	let visibleTiles = [];
	let visitedTiles = [];
	for (let i=0; i < mapMetadata.nTilesX; i++) {
		let visibleTilesRow = [];
		let visitedTilesRow = [];
		for (let j=0; j < mapMetadata.nTilesY; j++) {
			visibleTilesRow.push(false);
			visitedTilesRow.push(false);
		}

		visibleTiles.push(visibleTilesRow);
		visitedTiles.push(visitedTilesRow);
	}

	return {
		mapMetadata: mapMetadata,
		visibleTiles: visibleTiles,
		visitedTiles: visitedTiles,
		tokenPositions: {dwarf: {x: 200, y: 200}}, //DEBUG
	};	

}

function updateFromZoomScale(mapMetadata) {
	mapMetadata.mapScaleFactor = mapMetadata.zoomScale / mapMetadata.mapScale;
	mapMetadata.tileSizePx = mapMetadata.zoomScale * mapMetadata.tileSizeFt;
}


export default function(state = initialLocalState(), action) {
	console.log(action);

	switch (action.type) {
		case 'MOVE_TOKEN':
			//TODO: local action validation
			socket.emit("gameAction", action);

			return state;

		case 'SET_ZOOM':
			//TODO: save zoom in local state
			return state;


		case 'STATE_UPDATE':
			console.log("Updating state");
			let newMapMetadata = _.cloneDeep(action.state.mapMetadata);
			updateFromZoomScale(newMapMetadata);

			return {
				...action.state,
				mapMetadata: newMapMetadata,
			};

		default:
			return state;
	}
}


