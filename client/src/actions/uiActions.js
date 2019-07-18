export const setZoom = (viewScale) => {
	return {
		type: 'SET_ZOOM',
		viewScale: viewScale,
	}
}

export const openTool = (tool) => {
	return {
		type: 'OPEN_TOOL',
		tool: tool,
	}
}

export const closeTool = (tool) => {
	return {
		type: 'CLOSE_TOOL',
		tool: tool,
	}
}
