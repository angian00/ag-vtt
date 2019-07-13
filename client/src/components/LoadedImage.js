import React, { Component } from 'react';
import { Image } from 'react-konva';


export default class LoadedImage extends Component {
	constructor(props) {
		super(props);
		this.id = this.props.id;

		this.state = {
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
		return (
			<Image
				image={this.state.image}
				ref={node => { this.imageNode = node; }}
			/>
		);
	}
}
