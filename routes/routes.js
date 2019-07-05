const express = require("express");
const router = express.Router();


const users = require("../models/users");



router.get("/", (req, res) => {
	res.send({ response: "I am alive" }).status(200);
});

router.post("/users/authenticate", (req, res) => {
	let username = req.body.username;
	let pwd = req.body.password;

	let user = users.auth(username, pwd);
	if (user)
		res.status(200).send(user);
	else
		res.status(401).send({ message: "Invalid credentials" });
});

/*
router.get("/users", (req, res) => {
	//TODO: check saved credentials and roles
	res.send([{ name: "andrea", role: "player" }, { name: "balera", role: "dm" }]).status(200);
});
*/

module.exports = router;
