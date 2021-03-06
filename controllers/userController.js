const User = require("../models/user");
const { hashPassword, checkPassword } = require("../helpers/bcrypt");
const { generateToken, verifyToken } = require("../helpers/jwt");
const nodemailer = require("nodemailer");

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
		let payload = { email: req.body.email };
		User.findOneAndUpdate(
			{ email: req.body.email },
			{ resetToken: generateToken(payload) },
			{ new: true }
		)
			.then(user => {
				if (!user) throw { message: "invalid email" };

				let transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: `${process.env.email}`,
						pass: `${process.env.emailpass}`
					}
				});

				let url = `${process.env.CLIENT_ADDRESS}/reset-password/${user.resetToken}`;

				let mailOptions = {
					from: `${process.env.email}`,
					to: `${user.email}`,
					//to: 'devitas700@gmail.com',
					subject: "Reset password notification",
					html:
						"Hello are requested to reset password, <a href='" +
						url +
						"'>click this link to continue resetting</a>"
				};

				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log("Email sent: " + info.response);
					}
				});

				res.status(200).json({ user });
			})
			.catch(next);
	}

	static updatePassword(req, res, next) {
		if (!req.body.password) throw { message: "password is required" };
		let hashedPassword = hashPassword(req.body.password);
		User.findOneAndUpdate(
			{ email: req.emailUser },
			{ password: hashedPassword },
			{ new: true }
		)
			.then(user => {
				if (!user) throw { message: "user not found" };
				res.status(200).json({ user });
			})
			.catch(next);
	}
}

module.exports = UserController;
