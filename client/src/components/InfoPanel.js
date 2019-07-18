import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from '../actions/userActions';


//TODO: get from redux
const sessionMetadata = {
	charName: "Frodo Baggins",
	playerName: "Ron Howard",
	gmName: "Rody Zimmerman",
	campaignName: "The Mighty Sword of Fate",
	encounterName: "The Cavern of Slimy Doom"
};

class InfoPanel extends Component {
	logoutHandler(e) {
		this.props.logout(this.props.user.name);
	}

	render() {
		return (
			<div id="infoPanel" className="text-panel">
				<div id="userInfoContainer">
					<div className="info-item">
						<span className="info-label">player name:</span>
						&nbsp;
						<span className="info-text">{this.props.user.name}</span>
					</div>
					<button onClick={this.logoutHandler.bind(this)}>Log out</button>
				</div>

				<div id="sessionInfoContainer">
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

			</div>
		);
	}
}

export default connect(
	state => ({user: state.user}),
	{ logout }
)(InfoPanel);
