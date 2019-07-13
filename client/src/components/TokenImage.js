import React from 'react';
import { Image, Group, Rect, Circle } from 'react-konva';

import LoadedImage from './LoadedImage';


//layout settings, as percentages of token w/h
const statBarPaddingPerc = 0.1;
const statBarHeightPerc = 0.06;
//


export default class TokenImage extends LoadedImage {
	constructor(props) {
		super(props);

		let x = props.x;
		if (x === undefined)
			x = -999;

		let y = props.y;
		if (y === undefined)
			y = -999;

		this.state = {
			...super.state,
			x: x, y: y,
		};
	}

	componentDidUpdate(oldProps) {
		super.componentDidUpdate(oldProps);

		if (((this.props.x !== undefined) && (this.props.x !== this.state.x)) 
			|| ((this.props.y !== undefined) && (this.props.y !== this.state.y)))
			this.setState({ x: this.props.x, y: this.props.y });
	}

	render() {
		if (!this.state.image) 
			return null;

		//TODO: get from char stats
		const weaponRangeFt = 3;
		const hpPerc =0.8;
		const manaPerc =0.6;
		//

		//TODO: get from token metadata
		const tokenScale = 150; //px per ft
		//


		//TODO: refactor
		let w, h, statBarPadding, statBarHeight, statBarWidth, weaponRangePx;

		let scaleFactor = this.props.viewScale / tokenScale;

		w = this.state.image.width * scaleFactor;
		h = this.state.image.height * scaleFactor;

		statBarPadding = Math.round(statBarPaddingPerc * w);
		statBarHeight = Math.round(statBarHeightPerc * h);
		statBarWidth = w - 2*statBarPadding;

		weaponRangePx = weaponRangeFt * this.props.viewScale;

		let drawDecorations = this.props.drawDecorations && (!this.state.isDragging);

		console.log("Rendering token [" + this.props.id + "]");
		//console.log("x=" + this.state.x + ", y=" + this.state.y);
		//console.log("w=" + w + ", h=" + h);

		return (
			<Group>
				<Image
					x={this.state.x} y={this.state.y}
					scaleX={scaleFactor} scaleY={scaleFactor}
					opacity={this.state.isDragging ? 0.5 : 1}
					image={this.state.image}
					ref={node => { this.imageNode = node; }}
					draggable={true}
					onDragStart={e => {
						this.setState({ isDragging: true }); 
					}}
					onDragEnd={e => {
						let img = e.target;
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
