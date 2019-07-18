import React, { Component } from "react";
import { connect } from "react-redux";

import { sendChatMessage } from '../actions/chatActions';



class ChatPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputMsg: ""
		};
	}

	handleInputChange(e) {
		this.setState({ inputMsg: e.target.value });
	}

	handleSubmit(e) {
		if (this.state.inputMsg !== "") {
			this.props.sendChatMessage(this.state.inputMsg);
			this.setState({ inputMsg: "" });
		}

		e.preventDefault();
	}


	renderMsg(m, i) {
		let msgBody;

		if (m.msgType === "playerJoined") {
			msgBody = "-- joined the game";

		} else if (m.msgType === "chatMessage") {
			msgBody = m.text;

		} else if (m.msgType === "diceRoll") {
			msgBody = "-- rolled " + m.dNum + m.dType + ": ";
			for (let iDice=0; iDice < m.dNum; iDice++) {
				msgBody += m.rolls[iDice] + (iDice === m.dNum - 1 ? "" : " + ");
			}

			if (m.dNum > 1)
				msgBody += " = " + m.total;

		} else {
			msgBody = "??? Unknown message type: " + m.msgType;
		}

		return (
			<div key={i} className="chat-message">
				<div className="chat-sender">{m.sender}</div>
				<div className="chat-text">{msgBody}</div>
			</div>
		);
	}

	render() {
		return (
			<div id="chatPanel" className="text-panel">
				<div style={{ width: "100%" }}>
				{
					this.props.msgQueue.map((m, i) => this.renderMsg(m, i))
				}
				</div>

				<div style={{ width: "100%", position: "absolute", bottom: 5 }}>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<input type="text" className="chat-input"
							value={this.state.inputMsg}
							onChange={this.handleInputChange.bind(this)} />
		
						<input type="submit" value="Send" />
					</form>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({ msgQueue: state.msgQueue || [] }),
	{ sendChatMessage }
)(ChatPanel);
