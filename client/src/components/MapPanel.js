import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';

import GridLines from './GridLines';
import FogOfWar from './FogOfWar';
import { moveToken } from '../actions'


class LoadedImage extends Component {
	constructor(props) {
		super(props);
		this.id = this.props.id;
		this.store = props.store;

		this.state = { image: null, 
			x: (props.x || 0), y: (props.y || 0),
			scale: (props.scale || 1),
		};
	}

	componentDidMount() {
		this.loadImage();
	}

	componentDidUpdate(oldProps) {
		if (oldProps.src !== this.props.src) {
			this.loadImage();
		}

		if ((this.props.x && (this.props.x !== this.state.x)) 
			|| (this.props.y && (this.props.y !== this.state.y)))
			this.setState({ x: this.props.x, y: this.props.y });
	}

	componentWillUnmount() {
		this.image.removeEventListener('load', this.handleLoad.bind(this));
	}

	loadImage() {
		this.image = new window.Image();
		this.image.src = this.props.src;
		this.image.addEventListener('load', this.handleLoad.bind(this));
	}

	handleLoad () {
		this.setState({ image: this.image });
	}

	render() {
		let w, h;
		if (this.state.image) {
			w = this.state.image.width * this.props.scale;
			h = this.state.image.height * this.props.scale;
		}

		return (
			<Image
				x={this.state.x}
				y={this.state.y}
				width={w}
				height={h}
				image={this.state.image}
				ref={node => { this.imageNode = node; }}
				draggable={this.props.draggable}
				onDragStart={e => {
					let img = e.target;
					console.log(img);
					img.alpha(0.5);
					this.setState({ isDragging: true }); 
				}}
				onDragEnd={e => {
					let img = e.target;
					img.alpha(1);
					//this.setState({ isDragging: false, x: img.x(), y: img.y() });
					this.setState({ isDragging: false });

					this.props.draggedHandler(this.id, img.x(), img.y());
				}}
			/>
		);
	}
}

export default class MapPanel extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;

		//DEBUG
		this.store.dispatch(moveToken("dwarf", 0, 0));
	}

	tokenDraggedHandler(tokenId, x, y) {
		let mapMetadata = this.store.getState().mapMetadata;

		const snapToGrid = true; //TODO: move to option/metadata
		if (snapToGrid) {
			let tileSize = mapMetadata.tileSize;
			x = Math.round(x / tileSize);
			if (x < 0)
				x = 0;
			if (x >= mapMetadata.nTilesX)
				x = mapMetadata.nTilesX - 1;
			x *= tileSize;

			y = Math.round(y / tileSize);
			if (y < 0)
				y = 0;
			if (y >= mapMetadata.nTilesY)
				y = mapMetadata.nTilesY - 1;
			y *= tileSize;
		}

		this.store.dispatch(moveToken(tokenId, x, y));
	}


	render() {
		let tokenPos = this.store.getState().tokenPositions.dwarf || {x: -100, y: -100};

		return (
			<div id="mapPanel">
				<Stage width={2000} height={2000}>
					<Layer>
						<LoadedImage src="/images/dungeon_map.jpg" />
					</Layer>
					<Layer>
						<GridLines store={this.store} />
					</Layer>
					<Layer>
						<FogOfWar store={this.store} />
					</Layer>
					<Layer>
						<LoadedImage src="/images/dwarf.png" id="dwarf" scale={0.2} 
							x={tokenPos.x} y={tokenPos.y}
							draggable={true} draggedHandler={this.tokenDraggedHandler.bind(this)} />
					</Layer>
				</Stage>
			</div>
		);
	}
}
