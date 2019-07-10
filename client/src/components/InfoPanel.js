import React, { Component } from "react";


export default class InfoPanel extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		let allPos = this.store.getState().tokenPositions;
		console.log(this.store.getState());
		return (
			<div>
				<h3>Info Panel</h3>
				{
					Object.keys(allPos).map(k =>
						<div key={k}>{k} => (x: {allPos[k].x}, y: x: {allPos[k].y})</div>
					)
				}
			</div>
		);
	}
}
