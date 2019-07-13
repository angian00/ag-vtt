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
		socket.on("chatMessage", data => { 
			this.state.msgQueue.push(data);
			this.setState({ msgQueue: this.state.msgQueue });
		});
		
		socket.emit("chatMessage", { sender: this.user.name, text: "Hello" });
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


	render() {
		return (
			<div id="chatPanel" className="text-panel">
				<div style={{ width: "100%" }}>
				{
					this.state.msgQueue.map((m, i) =>
						<div key={i} className="chat-message">
							<div className="chat-sender">{m.sender}</div>
							<div className="chat-text">{m.text}</div>
						</div>
					)
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

