export const moveToken = (tokenId, x, y) => {
	return {
		type: 'MOVE_TOKEN',
		tokenId: tokenId, 
		x: x,
		y: y,
	}
}

export const rollDice = (dType, dNum, rolls, total) => {
	return {
		type: 'ROLL_DICE',
		dType: dType,
		dNum: dNum,
		rolls: rolls,
		total: total,
	}
}

export const sendChatMessage = (text) => {
	return {
		type: 'CHAT_MESSAGE',
		text: text,
	}
}


//----- local actions -----
export const setZoom = (viewScale) => {
	return {
		type: 'SET_ZOOM',
		viewScale: viewScale,
	}
}

export const runTool = (tool) => {
	return {
		type: 'RUN_TOOL',
		tool: tool,
	}
}

export const closeTool = (tool) => {
	return {
		type: 'CLOSE_TOOL',
		tool: tool,
	}
}
