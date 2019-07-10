import React, { Component } from "react";

//TODO: get from redux
const sessionMetadata = {
	charName: "Frodo Baggins",
	playerName: "Ron Howard",
	gmName: "Rody Zimmerman",
	campaignName: "The Mighty Sword of Fate",
	encounterName: "The Cavern of Slimy Doom"
};

export default class InfoPanel extends Component {
	render() {
		return (
			<div id="infoPanel" className="text-panel">
				<div className="info-item">
					<span className="info-label">hero name:</span>
					&nbsp;
					<span className="info-text">{sessionMetadata.charName}</span>
				</div>
				<div className="info-item">
					<span className="info-label">campaign:</span>
					&nbsp;
					<span className="info-text">{sessionMetadata.campaignName}</span>
				</div>
				<div className="info-item">
					<span className="info-label">encounter:</span>
					&nbsp;
					<span className="info-text">{sessionMetadata.encounterName}</span>
				</div>
			</div>

			//TODO: logout button
		);
	}
}
