import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';


class LoadedImage extends Component {
	constructor(props) {
		super(props);
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
					this.setState({ isDragging: false, x: img.x(), y: img.y() });
				}} 
			/>
		);
	}
}

export default class MapPanel extends Component {
	render() {
		return (

			<div id="mapPanel">
				<Stage width={2000} height={2000}>
					<Layer>
						<LoadedImage src="/images/dungeon_map.jpg" />
					</Layer>
					<Layer>
						<LoadedImage src="/images/dwarf.png" x={100} y={100} draggable={true} scale={0.2} />
					</Layer>
				</Stage>
			</div>
		);
	}
}
