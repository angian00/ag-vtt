import React from 'react';
import { Rect } from 'react-konva';

const fowColor = "#141414";

export default function FogOfWar(props) {
	let rects = [];
	for (let i=0; i < props.nTilesX; i++) {
		for (let j=0; j < props.nTilesY; j++) {
			let opacity = 1.0;
			if (props.visibleTiles[i][j])
				opacity = 0.0;
			else if (props.visitedTiles[i][j])
				opacity = 0.55;

			let rect = <Rect 
				key={"rect_" + i + "_" + j}
				x={ i * props.tileSizePx }
				y={ j * props.tileSizePx }
				width={ props.tileSizePx }
				height={ props.tileSizePx }
				fill={fowColor}
				opacity={opacity}
				listening={false}
			/>;
			rects.push(rect);
		}

	}

	return (rects);
}

