import React, { Component } from 'react';
import { Rect } from 'react-konva';

const fowColor = "#141414";

export default class FogOfWar extends Component {
	render() {
		let metadata = this.props.mapMetadata;

		let rects = [];
		for (let i=0; i < metadata.nTilesX; i++) {
			for (let j=0; j < metadata.nTilesY; j++) {
				let opacity = 1.0;
				if (this.props.visibleTiles[i][j])
					opacity = 0.0;
				else if (this.props.visitedTiles[i][j])
					opacity = 0.55;

				let rect = <Rect 
					key={"rect_" + i + "_" + j}
					x={ i*metadata.tileSizePx }
					y={ j*metadata.tileSizePx }
					width={ metadata.tileSizePx }
					height={ metadata.tileSizePx }
					fill={fowColor}
					opacity={opacity}
					listening={false}
				/>;
				rects.push(rect);
			}

		}

		return (rects);
	}
}
