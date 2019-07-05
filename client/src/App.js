import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";

import GridPage from "./components/GridPage";
import LoginPage from "./components/LoginPage";

import "./App.css";


// setup fake backend
//import { configureFakeBackend } from './utils/fakeBackend';
//configureFakeBackend();
//

export default class App extends Component {
    render() {
		return (
			<Router>
				<PrivateRoute exact path="/" component={GridPage} />
				<Route path="/login" component={LoginPage} />
			</Router>
        );
	}
}
