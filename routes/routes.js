const express = require("express");
const router = express.Router();


var gameState = require("../controllers/GameState");
const users = require("../controllers/users");


router.get("/", (req, res) => {
	res.send({ response: "I am alive" }).status(200);
});


router.get("/users", users.getAll);
router.post("/users/authenticate", users.authenticate);

/*
router.post("/users/authenticate", (req, res) => {
	let username = req.body.username;
	let pwd = req.body.password;

	console.log("User " + username + " authenticating");

	let user = users.auth(username, pwd);
	if (user)
		res.status(200).send(user);
	else
		res.status(401).send({ message: "Invalid credentials" });
});
*/


router.get("/gameState", (req, res) => {
	res.send(gameState).status(200);
});


module.exports = router;
