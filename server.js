const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;

const routes = require("./routes/routes");

const app = express();
app.use(routes);

const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", socket => {
	console.log("New client connected"), setInterval(
		() => getApiAndEmit(socket),
		1000
	);

	socket.on("disconnect", () => console.log("Client disconnected"));
});


let counter = 0;

const getApiAndEmit = async socket => {
	try {
		socket.emit("Counter", counter);
		counter += 1;

	} catch (error) {
		console.error(`Error: ${error.code}`);
	}
};

server.listen(port, () => console.log(`Listening on port ${port}`));
