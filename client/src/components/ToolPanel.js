import React, { Component } from "react";
import { connect } from "react-redux";

import { setZoom, openTool } from '../actions/uiActions';
import Shortcut from './Shortcut';


class ToolPanel extends Component {
	sendSetZoom(e) {
		this.props.setZoom(parseInt(e.target.value));
	}

	render() {
		return (
			<div id="toolPanel" className="text-panel">
				<div className="tools-group">
					<div className="tools-group-label">Zoom level (px per ft)</div>
					<select onChange={this.sendSetZoom.bind(this)} value={this.props.viewScale}>
						<option>10</option>
						<option>15</option>
						<option>30</option>
						<option>50</option>
					</select>
				</div>
				<div className="tools-group">
					<div className="tools-group-label">Dice</div>
					<Shortcut name="toolRollDice">
						<button onClick={()=>this.props.openTool("DiceRoller")}>Roll dice</button>
					</Shortcut>
				</div>
			</div>
		);
	}
}


export default connect(
	 state => ({ viewScale: (state ? state.ui.viewScale : 15) }),
	{ setZoom, openTool }
)(ToolPanel);
