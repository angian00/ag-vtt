import React from 'react';
import { Image } from 'react-konva';

import LoadedImage from './LoadedImage';


export default class MapImage extends LoadedImage {
	render() {
		if (!this.state.image) 
			return null;

		console.log("Rendering map [" + this.props.id + "]");
		//console.log("x=" + this.state.x + ", y=" + this.state.y);
		//console.log("w=" + w + ", h=" + h);

		return (
			<Image
				x={0} y={0}
				scaleX={this.props.scaleFactor} scaleY={this.props.scaleFactor}
				image={this.state.image}
				ref={node => { this.imageNode = node; }}
				draggable={false}
			/>
		);
	}
}
