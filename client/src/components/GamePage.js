import React, { Component } from "react";

import InfoPanel from "./InfoPanel";
import ToolPanel from "./ToolPanel";
import ChatPanel from "./ChatPanel";
import MapPanel from "./MapPanel";



export default class GamePage extends Component {
	render() {
		return (
			<div id="mainContainer">

				<div id="horContainer1">
					<InfoPanel />
					<ToolPanel />
				</div>

				<div id="horContainer2">
					<ChatPanel />
					<MapPanel />
				</div>
			</div>
		);
	}
}
