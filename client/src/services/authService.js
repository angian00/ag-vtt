import { authHeader } from '../utils/authHeader';

import { backendEndpoint } from "../config/config.js";


export const authService = {
	login,
	logout,
	register,
	update,
	_delete,
};


export function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch(`${backendEndpoint}/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then(user => {
			if (user) {
				console.log("authServices - Authentication successful");
				user.authdata = window.btoa(username + ':' + password);
				user.name = username;
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
}


export function logout() {
	localStorage.removeItem('user');
}


function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	};

	return fetch(`${backendEndpoint}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	};

return fetch(`${backendEndpoint}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};

	return fetch(`${backendEndpoint}/users/${id}`, requestOptions).then(handleResponse);
}


export function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				window.location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}

