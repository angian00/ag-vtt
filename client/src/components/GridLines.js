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
				points={[i*metadata.tileSize, 0, i*metadata.tileSize, metadata.tileSize*metadata.nTilesY]}
				stroke={gridColor}
				listening={false}
			/>;
			lines.push(line);
		}

		for (let j=0; j <= metadata.nTilesY; j++) {
			let line = <Line 
				key={"grid_row_" + j}
				points={[0, j*metadata.tileSize, metadata.tileSize*metadata.nTilesX, j*metadata.tileSize]}
				stroke={gridColor}
				listening={false}
			/>;
			lines.push(line);
		}

		return (lines);
	}
}
