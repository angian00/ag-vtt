
import socket from '../utils/websocket';


export default function chatReducer(state = {}, action) {
	//console.log(action);

	switch (action.type) {
		case 'CHAT_MESSAGE':
			socket.emit("chatMessage", { text: action.text });
			return state;

		case 'ROLL_DICE':
			socket.emit("diceRoll", { ...action });
			return state;

		default:
			return state;
	}
}

