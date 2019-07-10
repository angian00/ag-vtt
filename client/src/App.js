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


//FIXME: 
//use (a fixed version of) 
//<PrivateRoute exact path="/" render={(props) => <GridPage {...props} store={props.store} />} />
//to improve performance
//see https://learnwithparam.com/blog/how-to-pass-props-in-react-router/
// it seems PrivateRoute component does not properly support render function as a property
//				<PrivateRoute exact path="/" component={() => <GridPage {...this.props} store={this.props.store} />} />

export default class App extends Component {
    render() {
		return (
			<Router>
				<Route exact path="/" render={(props) => <GridPage {...props} store={this.props.store} />} />
				<Route path="/login" component={LoginPage} />
			</Router>
        );
	}
}
