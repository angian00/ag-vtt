function initialState() {
	let mapW = 1440;
	let mapH = 810;
	let tileSize = 90;
	let nTilesX = mapW / tileSize;
	let nTilesY = mapH / tileSize;

	let mapMetadata = {
		mapW: mapW,
		mapH: mapH,
		tileSize: tileSize,
		nTilesX: nTilesX,
		nTilesY: nTilesY,
	};

	let visibleTiles = [];
	let visitedTiles = [];
	for (let i=0; i < nTilesX; i++) {
		let visibleTilesRow = [];
		let visitedTilesRow = [];
		for (let j=0; j < nTilesY; j++) {
			visibleTilesRow.push(false);
			visitedTilesRow.push(false);
		}

		visibleTiles.push(visibleTilesRow);
		visitedTiles.push(visitedTilesRow);
	}

	visibleTiles[0][0] = true; //DEBUG
	visitedTiles[0][0] = true; //DEBUG

	return {
		mapMetadata: mapMetadata,
		visibleTiles: visibleTiles,
		visitedTiles: visitedTiles,
		tokenPositions: {},
	};	

}


export default function(state = initialState(), action) {
	switch (action.type) {
		case 'MOVE_TOKEN':
			console.log(action);
			console.log("Moving token");

			let newPos = {...state.tokenPositions};
			newPos[action.tokenId] = {x: action.x, y: action.y};

			return {
				...state,
				...updateVisTiles(state, action.x, action.y),
				tokenPositions: newPos,
				//visibleTiles: updateVisibleTiles(state, action.x, action.y)
			};

		default:
			return state;
	}
}


function updateVisTiles(state, x, y) {
	const visDistance = 3; // in # tiles

	let iToken = x / state.mapMetadata.tileSize;
	let jToken = y / state.mapMetadata.tileSize;

	let newVisibleTiles = [];
	let newVisitedTiles = [];

	for (let i=0; i < state.mapMetadata.nTilesX; i++) {
		let newVisibleTilesRow = [];
		let newVisitedTilesRow = [];

		for (let j=0; j < state.mapMetadata.nTilesY; j++) {
			let dx = i - iToken;
			let dy = j - jToken;
			let distance = Math.sqrt(dx*dx + dy*dy);
			
			let currTileVisible = (distance <= visDistance); 
			let currTileVisited = state.visitedTiles[i][j] || currTileVisible;

			newVisibleTilesRow.push(currTileVisible);
			newVisitedTilesRow.push(currTileVisited);
		}

		newVisibleTiles.push(newVisibleTilesRow);
		newVisitedTiles.push(newVisitedTilesRow);
	}

	return { visibleTiles: newVisibleTiles, visitedTiles: newVisitedTiles };
}