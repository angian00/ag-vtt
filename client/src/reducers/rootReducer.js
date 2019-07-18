import { combineReducers } from "redux";


import user from "./userReducer";
import gameState from "./gameStateReducer";
import msgQueue from "./msgQueueReducer";
import ui from "./uiReducer";
import chat from "./chatReducer";

export default combineReducers({
	user,
	gameState,
	msgQueue,
	ui,
	chat,
});
