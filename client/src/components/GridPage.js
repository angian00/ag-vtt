import React, { Component } from "react";

import ChatPanel from "./ChatPanel";
import MapPanel from "./MapPanel";



export default class GridPage extends Component {
	render() {
		return (
			<div id="mainContainer">

				<div id="infoPanel" className="bordered">
					<span>Info panel</span>
					<br />
				</div>

				<div id="horContainer">
					<ChatPanel id="chatPanel" className="bordered" />
					<MapPanel id="mapPanel" />
				</div>
			</div>
		);
	}
}
