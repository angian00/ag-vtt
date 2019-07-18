const _ = require("lodash");


class GameState {
	constructor() {
		this.state = this.init();

		//DEBUG
		this.performAction({
			type: 'MOVE_TOKEN',
			tokenId: "dwarf", 
			x: 100, y: 100,
		});
	}

	init() {
		let mapMetadata = {};

		//--proper map metadata

		//in pixels
		mapMetadata.mapW = 1440;
		mapMetadata.mapH = 810;

		// in pixels/ft
		mapMetadata.mapScale = 30;

		// in ft
		mapMetadata.tileSizeFt = 3;

		mapMetadata.nTilesX = Math.ceil(mapMetadata.mapW / (mapMetadata.mapScale*mapMetadata.tileSizeFt));
		mapMetadata.nTilesY = Math.ceil(mapMetadata.mapH / (mapMetadata.mapScale*mapMetadata.tileSizeFt));


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


	performAction(action) {
		console.log(action);

		switch (action.type) {
			case 'MOVE_TOKEN':
				this.state = {
					...this.state,
					...updateVisTiles(this.state, action.x, action.y),
					tokenPositions: { ...this.state.tokenPositions, 
						[action.tokenId]: {x: action.x, y: action.y}},
				};

			default:
				//ignore
		}
	}
}


function updateVisTiles(state, xToken, yToken) {
	let metadata = state.mapMetadata;

	//TODO: make it dependant on char stats
	const visDistanceFt = 8; // in ft


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



module.exports = new GameState();
//module.exports = GameState;
