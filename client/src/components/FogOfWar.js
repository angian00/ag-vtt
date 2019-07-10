import React, { Component } from 'react';
import { Rect } from 'react-konva';


export default class FogOfWar extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;
	}

	render() {
		let metadata = this.store.getState().mapMetadata;
		let visibleTiles = this.store.getState().visibleTiles;
		let visitedTiles = this.store.getState().visitedTiles;

		let rects = [];
		for (let i=0; i < metadata.nTilesX; i++) {
			for (let j=0; j < metadata.nTilesY; j++) {
				let opacity = 1.0;
				if (visibleTiles[i][j])
					opacity = 0.0;
				else if (visitedTiles[i][j])
					opacity = 0.55;

				let rect = <Rect 
					key={"rect_" + i + "_" + j}
					x={ i*metadata.tileSize }
					y={ j*metadata.tileSize }
					width={ metadata.tileSize }
					height={ metadata.tileSize }
					fill={"rgba(20, 20, 20, " + opacity + ")"}
					listening={false}
				/>;
				rects.push(rect);
			}

		}

		return (rects);
	}
}
