export const moveToken = (tokenId, x, y) => {
	return {
		type: 'MOVE_TOKEN',
		tokenId: tokenId, 
		x: x,
		y: y,
	}
}


export const setZoom = (zoomScale) => {
	return {
		type: 'SET_ZOOM',
		zoomScale: zoomScale,
	}
}

