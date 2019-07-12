import _ from "lodash";


function initialState() {
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
		tokenPositions: {dwarf: {x: -999, y: -999}},
	};	

}


export default function(state = initialState(), action) {
	console.log(action);

	switch (action.type) {
		case 'MOVE_TOKEN':
			return {
				...state,
				...updateVisTiles(state, action.x, action.y),
				tokenPositions: { ...state.tokenPositions, 
					[action.tokenId]: {x: action.x, y: action.y}},
			};

		case 'SET_ZOOM':
			let newMapMetadata = _.cloneDeep(state.mapMetadata);
			newMapMetadata.zoomScale = action.zoomScale;
			updateFromZoomScale(newMapMetadata);

			return {
				...state,
				mapMetadata: newMapMetadata,
			};

		default:
			return state;
	}
}


function updateVisTiles(state, xToken, yToken) {
	let metadata = state.mapMetadata;

	//TODO: make it dependant on char stats
	const visDistanceFt = 9; // in ft


	let newVisibleTiles = [];
	let newVisitedTiles = [];

	for (let i=0; i < metadata.nTilesX; i++) {
		let newVisibleTilesRow = [];
		let newVisitedTilesRow = [];

		for (let j=0; j < metadata.nTilesY; j++) {
			let dx = (i*metadata.tileSizeFt) - xToken/metadata.mapScale;
			let dy = (j*metadata.tileSizeFt) - yToken/metadata.mapScale;
			let distance = Math.sqrt(dx*dx + dy*dy);
			
			let currTileVisible = (distance <= visDistanceFt); 
			let currTileVisited = state.visitedTiles[i][j] || currTileVisible;

			newVisibleTilesRow.push(currTileVisible);
			newVisitedTilesRow.push(currTileVisited);
		}

		newVisibleTiles.push(newVisibleTilesRow);
		newVisitedTiles.push(newVisitedTilesRow);
	}

	return { visibleTiles: newVisibleTiles, visitedTiles: newVisitedTiles };
}


function updateFromZoomScale(mapMetadata) {
	mapMetadata.mapScaleFactor = mapMetadata.zoomScale / mapMetadata.mapScale;
	mapMetadata.tileSizePx = mapMetadata.zoomScale * mapMetadata.tileSizeFt;
}
