import React, { Component } from 'react';
import { Line } from 'react-konva';


const gridColor = "#141414";


export default class GridLines extends Component {
	render() {
		let metadata = this.props.mapMetadata;
		let lines = [];

		for (let i=0; i <= metadata.nTilesX; i++) {
			let line = <Line 
				key={"grid_col_" + i}
				points={[metadata.tileSizePx*i, 0, metadata.tileSizePx*i, metadata.tileSizePx*metadata.nTilesY]}
				stroke={gridColor}
				listening={false}
			/>;
			lines.push(line);
		}

		for (let j=0; j <= metadata.nTilesY; j++) {
			let line = <Line 
				key={"grid_row_" + j}
				points={[0, metadata.tileSizePx*j, metadata.tileSizePx*metadata.nTilesX, metadata.tileSizePx*j]}
				stroke={gridColor}
				listening={false}
			/>;
			lines.push(line);
		}

		return (lines);
	}
}
