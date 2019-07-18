import React from 'react';
import { connect } from "react-redux";

import { login, logout } from '../actions/userActions';


class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		};

		this.props.logout();
	}

	inputHandler(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	submitHandler(e) {
		e.preventDefault();

		const { username, password } = this.state;

		if ((!username) || (username === "") || (!password) || (password === "")) {
			return;
		}

		let targetUrl;
		if (this.props.location.state)
			targetUrl = this.props.location.state.from.pathName;
		else
			targetUrl = "/";

		this.props.login(username, password, targetUrl);
	}


	render() {
		return (
			<div className="">
				<h2>Login</h2>
				<form onSubmit={this.submitHandler.bind(this)}>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" value={this.state.username} 
							onChange={this.inputHandler.bind(this)} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={this.state.password}
							onChange={this.inputHandler.bind(this)} />
					</div>
					<div>
						<button disabled={this.props.loading}>Login</button>
						{
							null
							//TODO: loading spinner
							//loading && <img src="" />
						}
					</div>
					{ this.props.error &&
						<div>{this.props.error}</div>
					}
				</form>
			</div>
		);
	}
}


export default connect(
	state => ({}),
	{ login, logout }
)(LoginPage);
