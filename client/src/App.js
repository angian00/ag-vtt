import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./components/PrivateRoute";
import history from "./services/history";

import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import GamePage from "./components/GamePage";

import "./App.css";


class App extends Component {
    render() {
		return (
			<Router history={history}>
				<PrivateRoute exact path="/dashboard" component={DashboardPage} />
				<PrivateRoute exact path="/game" component={GamePage} />
				<Route path="/login" component={LoginPage} />
			</Router>
        );
	}
}

export default connect(
	state => ({username: state.username})
)(App);