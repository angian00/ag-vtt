import React, { Component } from "react";

import InfoPanel from "./InfoPanel";
import ChatPanel from "./ChatPanel";
import MapPanel from "./MapPanel";



export default class GridPage extends Component {
	render() {
		return (
			<div id="mainContainer">

				<div id="infoPanel" className="bordered">
					<InfoPanel store={this.props.store} />
					<br />
				</div>

				<div id="horContainer">
					<ChatPanel id="chatPanel" className="bordered" />
					<MapPanel id="mapPanel" store={this.props.store} />
				</div>
			</div>
		);
	}
}
