const model = require('../models/sqlModel');

exports.getAll = (req, res) => {
	model.User.findAll({}).then(users => {
		res.json(users);
	}).catch(err => {
		logger.error(err);
		res.status(500).send("Database error: " + err);
	});
};


exports.authenticate = (req, res) => {
	let nickname = req.body.nickname;
	let pwd = req.body.password;

	console.log("User " + nickname + " authenticating");

	//TODO: hash password
	let user = model.User.findOne({ where: {nickname: nickname, pwdHash: pwd}}).then(user =>  {
		if (user) {
			console.log("User " + nickname + " authenticated");
			user = user.toJSON();
			delete user.pwdHash; //remove sensitive field from returned object
			res.status(200).send(user);

		} else {
			console.log("User " + nickname + " authentication failed");
			res.status(401).send({ message: "Invalid credentials" });
		}

	}).catch(err => {
		logger.error(err);
		res.status(500).send("Database error: " + err);
	});
}


exports.register = (req, res) => {
	let nickname = req.body.nickname;
	let pwd = req.body.password;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;

	console.log("User " + nickname + " registering");

	//TODO: hash password
	let user = model.User.create({ 
		nickname: nickname,
		pwdHash: pwd,
		firstName: firstName,
		lastName: lastName,

	}).then(user =>  {
			res.status(200).send(user);

	}).catch(err => {
		logger.error(err);
		res.status(400).send("Database error: " + err);
	});
}