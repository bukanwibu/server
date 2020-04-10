const User = require("../models/user");
const { hashPassword, checkPassword } = require("../helpers/bcrypt");
const { generateToken, verifyToken } = require("../helpers/jwt");

class UserController {
	static register(req, res, next) {
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
			.then(newUser => {
				res.status(201).json({
					newUser
				});
			})
			.catch(next);
	}

	static login(req, res, next) {
		if (!req.body.identity) throw { message: "identity is required" };
		if (!req.body.password) throw { message: "password is required" };

		User.findOne({
			$or: [{ name: req.body.identity }, { email: req.body.identity }]
		})
			.then(user => {
				if (!user) throw { message: "invalid identity or password" };
				let passwordInput = req.body.password;
				let passwordDb = user.password;
				let isPassword = checkPassword(passwordInput, passwordDb);
				console.log("pas");
				if (!isPassword) throw { message: "invalid identity or password" };
				let payload = {
					id: user._id,
					name: user.name,
					email: user.email
				};
				let token = generateToken(payload);
				res.status(200).json({ token, user });
			})
			.catch(next);
	}

	static forgotPassword(req, res, next) {
		if (!req.body.email) throw { message: "email is required" };
		User.findOne({ email: req.body.email }).then(user => {
			if (!user) throw { message: "invalid email" };

			// Update password DB & send random password to email
			res.status(200).json({ user });
		});
	}
}

module.exports = UserController;
