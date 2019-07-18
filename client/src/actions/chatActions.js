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

