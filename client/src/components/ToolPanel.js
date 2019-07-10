import React, { Component } from "react";


export default class ToolPanel extends Component {
	render() {
		return (
			<div id="toolPanel" className="text-panel">
				<div className="tools-group-label">Encounters</div>
				<button>New</button>
				<button>Save</button>
				<button>Delete</button>
			</div>
		);
	}
}
