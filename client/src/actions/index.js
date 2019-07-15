export const moveToken = (tokenId, x, y) => {
	return {
		type: 'MOVE_TOKEN',
		tokenId: tokenId, 
		x: x,
		y: y,
	}
}


export const rollDice = (dType, dNum) => {
	return {
		type: 'ROLL_DICE',
		dType: dType,
		dNum: dNum
	}
}


//----- local actions -----
export const setZoom = (zoomScale) => {
	return {
		type: 'SET_ZOOM',
		zoomScale: zoomScale,
	}
}

