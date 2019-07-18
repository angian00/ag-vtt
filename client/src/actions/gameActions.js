import { backendEndpoint } from "../config/config.js";


export const moveToken = (tokenId, x, y) => {
	return {
		type: 'MOVE_TOKEN',
		tokenId: tokenId, 
		x: x,
		y: y,
	}
}


export function syncGameState() {
	return dispatch => {
		fetch(`${backendEndpoint}/gameState`)
			.then(
				res => {
					if (res.status == 200) {
						res.json().then(data => {
							console.log("gameActions - syncGameState successful");
							console.log(data);
							dispatch({type: "STATE_UPDATE", state: data.state });
						});

					} else {
						//TODO: error
					}

				},
				error => {
					console.log("gameActions - syncGameState failed");
					//dispatch(failure(error.toString()));
					//dispatch(alertActions.error(error.toString()));
				}
			);
	}
}
