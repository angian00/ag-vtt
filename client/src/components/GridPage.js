import React, { Component } from "react";
//import { Container, Row, Col } from "reactstrap";
//import GridLayout from 'react-grid-layout';
import RGL, { WidthProvider } from "react-grid-layout";


import ChatPanel from "./ChatPanel";


const heightMargin = 80;

const ReactGridLayout = WidthProvider(RGL);


export default class GridPage extends Component {

	constructor(props) {
		super(props);
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}


	render() {
		// layout is an array of objects, see the demo for more complete usage
		var layout = [
			{i: 'info', x: 0, y: 0, w: 12, h: 1,  static: true},
			{i: 'chat', x: 0, y: 1, w: 3,  h: 11, static: true},
			{i: 'map',  x: 3, y: 1, w: 9,  h: 11, static: true}
		];


		let clientId = Math.floor(Math.random() * 10000); //TODO: implement authentication

		return (
			<ReactGridLayout className="layout" layout={layout} cols={12} 
				margin={[5, 5]} containerPadding={[0, 0]}
				rowHeight={(this.state.height - heightMargin)/12}>

				<div key="info" className="bordered">TODO: info panel</div>
				<div key="chat" className="bordered">
					<ChatPanel username={clientId} />
				</div>
				<div key="map"  className="bordered">TODO: map panel</div>
			</ReactGridLayout>
		);
	}
}
