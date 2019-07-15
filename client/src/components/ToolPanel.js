import React, { Component } from "react";
import { connect } from "react-redux";

import { setZoom } from '../actions';
import Shortcut from './Shortcut';
import { runTool } from '../utils/tools.js';


class ToolPanel extends Component {
	sendSetZoom(e) {
		let zoomScale = parseInt(e.target.value);
		console.log("zoomScale: " + zoomScale);
		this.props.setZoom(zoomScale);
	}

	render() {
		return (
			<div id="toolPanel" className="text-panel">
				<div className="tools-group">
					<div className="tools-group-label">Encounters</div>
					<button>New</button>
					<button>Save</button>
					<button>Delete</button>
				</div>
				<div className="tools-group">
					<div className="tools-group-label">Zoom level (px per ft)</div>
					<select onChange={this.sendSetZoom.bind(this)} value={this.props.zoomScale}>
						<option>10</option>
						<option>15</option>
						<option>30</option>
						<option>50</option>
					</select>
				</div>
				<div className="tools-group">
					<div className="tools-group-label">Dice</div>
					<Shortcut name="toolRollDice">
						<button onClick={()=>runTool("rollDice")}>Roll dice</button>
					</Shortcut>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	if (state) {
		const { mapMetadata } = state || null;
		return { zoomScale: mapMetadata.zoomScale };
	} else
		return { zoomScale: 15 };
}

export default connect(
	mapStateToProps,
	{ setZoom }
)(ToolPanel);
