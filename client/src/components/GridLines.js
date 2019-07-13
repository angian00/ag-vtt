import React from 'react';
import { Line } from 'react-konva';


const gridColor = "#141414";


export default function GridLines(props) {
	let tileSizePx = props.tileSizePx;

	let lines = [];

	for (let i=0; i <= props.nTilesX; i++) {
		let line = <Line 
			key={"grid_col_" + i}
			points={[tileSizePx*i, 0, tileSizePx*i, tileSizePx*props.nTilesY]}
			stroke={gridColor}
			listening={false}
		/>;
		lines.push(line);
	}

	for (let j=0; j <= props.nTilesY; j++) {
		let line = <Line 
			key={"grid_row_" + j}
			points={[0, tileSizePx*j, tileSizePx*props.nTilesX, tileSizePx*j]}
			stroke={gridColor}
			listening={false}
		/>;
		lines.push(line);
	}

	return (lines);
}
