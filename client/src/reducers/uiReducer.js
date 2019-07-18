
export default function uiReducer(state = initialState(), action) {
	switch (action.type) {
		case 'SET_ZOOM':
			return {
				...state,
				viewScale: action.viewScale,
			};

		case 'OPEN_TOOL':
			switch (action.tool) {
				case 'DiceRoller':
					return {
						...state,
						isDiceRollerOpen: true,
					};
				default:
					return state;
			}

		case 'CLOSE_TOOL':
			switch (action.tool) {
				case 'DiceRoller':
					return {
						...state,
						isDiceRollerOpen: false,
					};
				default:
					return state;
			}

		default:
			return state;
	}
}


function initialState() {
	return {
		viewScale: 30,
		isDiceRollerOpen: false
	};	

}
