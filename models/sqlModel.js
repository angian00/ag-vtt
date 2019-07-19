const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./db/vtt.db",
	define: {
		timestamps: false,
		freezeTableName: true,
		underscored: true
	},
	logging: false
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});


class User extends Sequelize.Model {}
User.init({
		nickname: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		pwdHash: {
			type: Sequelize.STRING,
			allowNull: false
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING
		}
	}, {
	sequelize,
});



class Campaign extends Sequelize.Model {}
Campaign.init({
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING
		},
	}, {
	sequelize,
});

User.hasMany(Campaign, { foreignKey: "gmId" });
Campaign.belongsTo(User, { foreignKey: "gmId" });


User.sync();
Campaign.sync();

exports.User = User;
exports.Campaign = Campaign;

exports.sequelize = sequelize;
