import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from "react-redux";

import GridLines from './GridLines';
import FogOfWar from './FogOfWar';
import MapImage from './MapImage';
import TokenImage from './TokenImage';

import { syncGameState, moveToken } from '../actions/gameActions';


class MapPanel extends Component {
	componentWillMount() {
		this.props.syncGameState();
		//this.props.moveToken("dwarf", 200, 200);
	}


	tokenDraggedHandler(tokenId, x, y) {
		let mapMetadata = this.props.mapMetadata;
		let viewMetadata = this.props.viewMetadata;

		const snapToGrid = true; //TODO: move to option/metadata
		if (snapToGrid) {
			x = Math.round(x / viewMetadata.tileSizePx);
			if (x < 0)
				x = 0;
			if (x >= mapMetadata.nTilesX)
				x = mapMetadata.nTilesX - 1;
			x *= viewMetadata.tileSizePx;

			y = Math.round(y / viewMetadata.tileSizePx);
			if (y < 0)
				y = 0;
			if (y >= mapMetadata.nTilesY)
				y = mapMetadata.nTilesY - 1;
			y *= viewMetadata.tileSizePx;
		}

		x /= viewMetadata.mapScaleFactor;
		y /= viewMetadata.mapScaleFactor;

		this.props.moveToken(tokenId, x, y);
	}


	render() {
		if (!this.props.mapMetadata)
			return null;

		//console.log("MapPanel.render()");
		//console.log(this.props.mapMetadata);
		//console.log(this.props.viewMetadata);
		//console.log(this.props.tokenPositions);

		let tokenPos = this.props.tokenPositions.dwarf || {x: -100, y: -100};
		let mapScaleFactor = this.props.viewMetadata.mapScaleFactor;
		let mapW = this.props.mapMetadata.mapW;
		let mapH = this.props.mapMetadata.mapH;

		return (
			<div id="mapPanel">
				<Stage width={mapW*mapScaleFactor} height={mapH*mapScaleFactor}>
					<Layer>
						<MapImage src="/images/dungeon_map.jpg" id="map" 
							scaleFactor={mapScaleFactor} />
					</Layer>
					<Layer>
						<GridLines 
							tileSizePx={this.props.viewMetadata.tileSizePx}
							nTilesX={this.props.mapMetadata.nTilesX}
							nTilesY={this.props.mapMetadata.nTilesY}
						/>
					</Layer>
					<Layer>
						<FogOfWar 
							tileSizePx={this.props.viewMetadata.tileSizePx}
							nTilesX={this.props.mapMetadata.nTilesX}
							nTilesY={this.props.mapMetadata.nTilesY}
							visibleTiles={this.props.visibleTiles}
							visitedTiles={this.props.visitedTiles}
						/>
					</Layer>
					<Layer>
						<TokenImage src="/images/dwarf.png" id="dwarf"
							viewScale={this.props.viewScale}
							x={tokenPos.x * mapScaleFactor}
							y={tokenPos.y * mapScaleFactor}
							drawDecorations={true} 
							draggedHandler={this.tokenDraggedHandler.bind(this)} />
					</Layer>
				</Stage>
			</div>
		);
	}
}


function computeViewMetadata(mapMetadata, viewScale) {
	return {
		mapScaleFactor: viewScale / mapMetadata.mapScale,
		tileSizePx: viewScale * mapMetadata.tileSizeFt,
	}
}


function mapStateToProps(state) {
	console.log(state);
	if (!state || !state.gameState)
		return {};

	let viewMetadata = computeViewMetadata(state.gameState.mapMetadata, state.ui.viewScale);

	return {
		...state.gameState,
		viewMetadata: viewMetadata,
		viewScale: state.ui.viewScale,
	};
		
}


export default connect(
	mapStateToProps,
	{ syncGameState, moveToken }
)(MapPanel);
