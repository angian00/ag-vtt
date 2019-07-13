import React, { Component } from 'react';
import { Stage, Layer, Image, Group, Rect, Circle } from 'react-konva';
import { connect } from "react-redux";
//import _ from "lodash";

import GridLines from './GridLines';
import FogOfWar from './FogOfWar';
import { moveToken } from '../actions';


//as percentages of w/h
const statBarPaddingPerc = 0.1;
const statBarHeightPerc = 0.06;
//

class LoadedImage extends Component {
	constructor(props) {
		super(props);
		this.id = this.props.id;

		let x = props.x;
		if (x === undefined)
			x = -999;

		let y = props.y;
		if (y === undefined)
			y = -999;

		this.state = {
			x: x, y: y,
			image: null, 
		};
	}

	componentDidMount() {
		this.loadImage();
	}

	componentDidUpdate(oldProps) {
		if (oldProps.src !== this.props.src) {
			this.loadImage();
		}

		if (((this.props.x !== undefined) && (this.props.x !== this.state.x)) 
			|| ((this.props.y !== undefined) && (this.props.y !== this.state.y)))
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
		console.log("Loaded image for [" + this.props.id + "]");
		this.setState({ image: this.image });
	}

	render() {
		if (!this.state.image) 
			return null;

		//TODO: get from chr props
		const weaponRangeFt = 3;
		const hpPerc =0.8;
		const manaPerc =0.6;
		//

		//TODO: get from token props
		const tokenScale = 150; //px per ft
		//


		//TODO: refactor
		let w, h, statBarPadding, statBarHeight, statBarWidth, weaponRangePx;

		let scaleFactor;
		if (this.props.id === "map") {
			scaleFactor = this.props.mapScaleFactor;
		} else {
			scaleFactor = this.props.zoomScale / tokenScale;
		}

		w = this.state.image.width * scaleFactor;
		h = this.state.image.height * scaleFactor;

		statBarPadding = Math.round(statBarPaddingPerc * w);
		statBarHeight = Math.round(statBarHeightPerc * h);
		statBarWidth = w - 2*statBarPadding;

		weaponRangePx = weaponRangeFt * this.props.zoomScale;

		let drawDecorations = this.props.drawDecorations && (!this.state.isDragging);

		console.log("Rendering [" + this.props.id + "]");
		console.log("x=" + this.state.x + ", y=" + this.state.y);
		console.log("w=" + w + ", h=" + h);

		return (
			<Group>
				<Image
					x={this.state.x} y={this.state.y}
					scaleX={scaleFactor} scaleY={scaleFactor}
					image={this.state.image}
					ref={node => { this.imageNode = node; }}
					draggable={this.props.draggable}
					onDragStart={e => {
						let img = e.target;
						//img.alpha(0.5);
						this.setState({ isDragging: true }); 
					}}
					onDragEnd={e => {
						let img = e.target;
						//img.alpha(1);
						this.setState({ isDragging: false });

						this.props.draggedHandler(this.id, img.x(), img.y());
					}}
				/>
				{
					drawDecorations ?
						<Group>
							<Rect
								x={this.state.x + statBarPadding}
								y={this.state.y + w}
								width={statBarWidth}
								height={statBarHeight}
								fill="black"
							/>
							<Rect
								x={this.state.x + statBarPadding}
								y={this.state.y + w}
								width={statBarWidth*hpPerc}
								height={statBarHeight}
								fill="red"
							/>
							<Rect
								x={this.state.x + statBarPadding}
								y={this.state.y + w + 2*statBarHeight}
								width={statBarWidth}
								height={statBarHeight}
								fill="black"
							/>
							<Rect
								x={this.state.x + statBarPadding}
								y={this.state.y + w + 2*statBarHeight}
								width={statBarWidth*manaPerc}
								height={statBarHeight}
								fill="blue"
							/>

							<Circle
								x={this.state.x + w/2}
								y={this.state.y + h/2}
								radius={weaponRangePx}
								stroke="#00ff00"
								strokeWidth={0.5}
								listening={false}
							/>
						</Group>
					: null
				}
			</Group>
		);
	}
}

class MapPanel extends Component {
	constructor(props) {
		super(props);

		//DEBUG
		console.log("MapPanel constructor - Moving token");
		this.props.moveToken("dwarf", 0, 0);
		//
	}

	componentDidMount() {
	}

	tokenDraggedHandler(tokenId, x, y) {
		let mapMetadata = this.props.mapMetadata;

		console.log("tokenDraggedHandler");
		console.log("x=" + x + ", y=" + y);

		const snapToGrid = true; //TODO: move to option/metadata
		if (snapToGrid) {
			x = Math.round(x / mapMetadata.tileSizePx);
			if (x < 0)
				x = 0;
			if (x >= mapMetadata.nTilesX)
				x = mapMetadata.nTilesX - 1;
			x *= mapMetadata.tileSizePx;

			y = Math.round(y / mapMetadata.tileSizePx);
			if (y < 0)
				y = 0;
			if (y >= mapMetadata.nTilesY)
				y = mapMetadata.nTilesY - 1;
			y *= mapMetadata.tileSizePx;
		}

		x = view2mapCoord(x, this.props.mapMetadata);
		y = view2mapCoord(y, this.props.mapMetadata);
		console.log("tokenDraggedHandler - Moving token");
		this.props.moveToken(tokenId, x, y);
	}


	render() {
		if (!this.props.mapMetadata)
			return null;

		console.log("MapPanel.render()");
		console.log(this.props.mapMetadata);
		console.log(this.props.tokenPositions);

		let tokenPos = this.props.tokenPositions.dwarf || {x: -100, y: -100};
		let mapScaleFactor = this.props.mapMetadata.mapScaleFactor;
		let mapW = this.props.mapMetadata.mapW;
		let mapH = this.props.mapMetadata.mapH;

		return (
			<div id="mapPanel">
				<Stage width={mapW*mapScaleFactor} height={mapH*mapScaleFactor}>
					<Layer>
						<LoadedImage src="/images/dungeon_map.jpg" id="map" 
							x={0} y={0} mapScaleFactor={mapScaleFactor} />
					</Layer>
					<Layer>
						<GridLines mapMetadata={this.props.mapMetadata} />
					</Layer>
					{/* <Layer>
						<FogOfWar mapMetadata={this.props.mapMetadata} 
							visibleTiles={this.props.visibleTiles}
							visitedTiles={this.props.visitedTiles}
						/>
					</Layer> */}
					<Layer>
						<LoadedImage src="/images/dwarf.png" id="dwarf"
							zoomScale={this.props.mapMetadata.zoomScale}
							x={map2viewCoord(tokenPos.x, this.props.mapMetadata)}
							y={map2viewCoord(tokenPos.y, this.props.mapMetadata)}
							drawDecorations={true} 
							draggable={true} draggedHandler={this.tokenDraggedHandler.bind(this)} />
					</Layer>
				</Stage>
			</div>
		);
	}
}


function view2mapCoord(viewCoord, mapMetadata) {
	return viewCoord * mapMetadata.mapScale / mapMetadata.zoomScale;
}

function map2viewCoord(mapCoord, mapMetadata) {
	return mapCoord * mapMetadata.zoomScale / mapMetadata.mapScale;
}


export default connect(
	state => state || {},
	{ moveToken }
)(MapPanel);
