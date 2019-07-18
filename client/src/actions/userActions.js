import { authService } from '../services/authService';
import history from '../services/history';


export function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		authService.login(username, password)
			.then(
				user => { 
					console.log("userActions - login successful");
					dispatch(success(user));
					history.push('/');
				},
				error => {
					console.log("userActions - login failed");
					dispatch(failure(error.toString()));
					//dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: "LOGIN_REQUEST", user } }
	function success(user) { return { type: "LOGIN_SUCCESS", user } }
	function failure(error) { return { type: "LOGIN_FAILURE", error } }
}


export function logout(user) {
	return dispatch => {
		console.log("before authService.logout: ");
		console.log(user);

		authService.logout();

		console.log("after authService.logout: ");
		console.log(user);
		//trigger re-validation of PrivateRoute
		if (user)
			history.push('/');
	};
}


export function register(user) {
	return dispatch => {
		dispatch(request(user));

		authService.register(user)
			.then(
				user => { 
					dispatch(success());
					history.push('/login');
					//dispatch(alertActions.success("Registration successful"));
				},
				error => {
					dispatch(failure(error.toString()));
					//dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: "REGISTER_REQUEST", user } }
	function success(user) { return { type: "REGISTER_SUCCESS", user } }
	function failure(error) { return { type: "REGISTER_FAILURE", error } }
}
