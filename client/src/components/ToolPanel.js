import React, { Component } from "react";
import { connect } from "react-redux";

import { setZoom } from '../actions';


class ToolPanel extends Component {
	sendSetZoom(e) {
		let zoomScale = parseInt(e.target.value);
		console.log("zoomScale: " + zoomScale);
		this.props.setZoom(zoomScale);
	}


	render() {
		return (
			<div id="toolPanel" className="text-panel">
				<div>
					<div className="tools-group-label">Encounters</div>
					<button>New</button>
					<button>Save</button>
					<button>Delete</button>
				</div>
				<div>
					<div className="tools-group-label">Zoom level (px per ft)</div>
					<select onChange={this.sendSetZoom.bind(this)} value={this.props.zoomScale}>
						<option>10</option>
						<option>15</option>
						<option>30</option>
						<option>50</option>
					</select>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { mapMetadata } = state
	return { zoomScale: mapMetadata.zoomScale }
}

export default connect(
	mapStateToProps,
	{ setZoom }
)(ToolPanel);
