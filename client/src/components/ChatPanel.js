import React, { Component } from "react";

import socket from '../utils/websocket';


export default class ChatPanel extends Component {
	constructor(props) {
		super(props);
		this.user = JSON.parse(localStorage.user);

		this.state = {
			inputMsg: "",
			msgQueue: []
		};
	}

	componentDidMount() {
		socket.on("playerJoined", data => { 
			this.state.msgQueue.push({msgType: "playerJoined", ...data});
			this.setState({ msgQueue: this.state.msgQueue });
		});
		
		socket.on("chatMessage", data => { 
			this.state.msgQueue.push({msgType: "chatMessage", ...data});
			this.setState({ msgQueue: this.state.msgQueue });
		});
		
		socket.on("diceRoll", data => { 
			this.state.msgQueue.push({msgType: "diceRoll", ...data});
			this.setState({ msgQueue: this.state.msgQueue });
		});
		
		socket.emit("playerJoined", { sender: this.user.name });
	}

	handleInputChange(e) {
		this.setState({ inputMsg: e.target.value });
	}

	handleSubmit(e) {
		if (this.state.inputMsg !== "") {
			socket.emit("chatMessage", { sender: this.user.name, text: this.state.inputMsg });
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
					this.state.msgQueue.map((m, i) => this.renderMsg(m, i))
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

