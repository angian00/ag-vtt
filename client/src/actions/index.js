export const moveToken = (tokenId, x, y) => {
	return {
		type: 'MOVE_TOKEN',
		tokenId: tokenId, 
		x: x,
		y: y,
	}
}


//----- local actions -----
export const setZoom = (viewScale) => {
	return {
		type: 'SET_ZOOM',
		viewScale: viewScale,
	}
}


export const rollDice = (dType, dNum, result) => {
	return {
		type: 'ROLL_DICE',
		dType: dType,
		dNum: dNum,
		result: result
	}
}

