
export default function userReducer(state = initialState(), action) {
	//console.log(action);

	switch (action.type) {
		case 'LOGIN_REQUEST':
			console.log("rootReducer - LOGIN_REQUEST");

			return {
				loginStatus: "LOGGED_IN", //TODO: LOGGING_IN status
				...action.user,
			}

		case 'LOGIN_SUCCESS':
			console.log("rootReducer - LOGIN_SUCCESS");
			
			return {
				loginStatus: "LOGGED_IN",
				...action.user,
			}

		case 'LOGOUT':
			console.log("rootReducer - LOGOUT");
			
			return {
				loginStatus: "LOGGED_OUT",
			}


		default:
			return state;
	}
}


function initialState() {
	let userStr = localStorage.getItem("user");
	let user;
	if (userStr) {
		user = {
			...JSON.parse(userStr),
			loginStatus: "LOGGED_IN"
		};
	} else {
		user = {loginStatus: "LOGGED_OUT"};
	}

	return user;
}
