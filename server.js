const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//const axios = require("axios");
const port = process.env.PORT || 4001;


const GameState = require("./controllers/GameState");
var gameState = new GameState();


const app = express();
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const routes = require("./routes/routes");
app.use(routes);


const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", socket => {
	console.log("New client connected");

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

	socket.on("chatMessage", msg => {
		console.log("Received chatMessage");
		console.log(msg);
		//DEBUG
		io.emit("chatMessage", msg);
	});

	socket.on("gameAction", action => {
		console.log("Received action: " + action.type);
		gameState.performAction(action);
		//TODO: check for errors

		//DEBUG
		console.log("Sending stateUpdate");
		io.emit('stateUpdate', gameState.state);
		//setTimeout(() => {io.emit("stateUpdate", gameState.state);}, 3000);
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
