import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import {backendEndpoint} from "../config/config.js";


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
		this.socket = socketIOClient(backendEndpoint);

		this.socket.on("ChatMessage", data => { 
			this.state.msgQueue.push(data);
			this.setState({ msgQueue: this.state.msgQueue });
		});
		
		this.socket.emit("ChatMessage", { sender: this.user.name, text: "Hello" });
	}

	handleInputChange(e) {
		this.setState({ inputMsg: e.target.value });
	}

	handleSubmit(e) {
		if (this.state.inputMsg !== "") {
			this.socket.emit("ChatMessage", { sender: this.user.name, text: this.state.inputMsg });
			this.setState({ inputMsg: "" });
		}

		e.preventDefault();
	}


	render() {
		return (
			<div id={this.props.id} className="bordered">
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

