import React, { Component } from "react";

import InfoPanel from "./InfoPanel";
import ToolPanel from "./ToolPanel";
import ChatPanel from "./ChatPanel";
import MapPanel from "./MapPanel";

import DiceRoller from "./DiceRoller";


export default class GamePage extends Component {
	render() {
		return (

        	<div id="mainContainer">
				{/* modal forms */}
				<DiceRoller />

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
