import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*
export const PrivateRoute = ({ component: Component, username, ...rest }) => (
	<Route {...rest} render={props => (
		username
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)} />
)
*/


export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		return (
			localStorage.getItem('user')
				? <Component {...props} />
				: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				);
	}
	} />
)
