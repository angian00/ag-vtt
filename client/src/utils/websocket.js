import socketIOClient from "socket.io-client";

import {backendEndpoint} from "../config/config.js";


let socket = socketIOClient(backendEndpoint);

export default socket;
