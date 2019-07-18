let staticUsers = [
	{ name: "andrea", password: "ag", role: "dm"},
	{ name: "loana", password: "loana", role: "player"},
];


function auth(username, password) {
	for (let u of staticUsers) {
		if ((u.name == username) && (u.password == password) ) {
			//TODO: remove password password
			return u;
		}
	}

	return null;
}


module.exports = {
	auth: auth
};
