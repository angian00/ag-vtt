
export default function msgQueueReducer(state = [], action) {
	//console.log(action);

	switch (action.type) {
		case 'CHAT_EVENT':
			console.log("CHAT_EVENT");
			console.log(state);
			return [
				...state, 
				action.eventData
			];

		default:
			return state;
	}
}


