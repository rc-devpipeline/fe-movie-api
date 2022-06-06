/* 
TODO:
	- Check for json content-type
	- Add url params parsing for data formatting
	- update swapi
*/
const express = require("express");
const bcrypt = require("bcrypt");

const verifyToken = require("../../middleware/verifyToken");
const getSession = require("../../middleware/getSession");
const generateToken = require("../../util/generateToken");
const UserModel = require("../../models/userModel");
const SessionModel = require("../../models/sessionModel");
const router = express.Router();

// Login
router.post("/login", async (req, res) => {
	const user = await UserModel.findOne({
		$or: [{ email: req.body.user_name }, { user_name: req.body.user_name }],
	});

	if (!user) {
		return res.status(403).redirect("/forbidden");
	}

	const isVaildPass = await bcrypt.compare(req.body.password, user.password);

	if (!isVaildPass) {
		return res.status(401).json({ message: "Invalid Credentials" });
	}

	const token = await generateToken({ _id: user._id, role: user.role });
	const currentSession = await SessionModel.findOne({ user: user._id });

	const loginResponse = (token) => {
		res.cookie("stj", token.token, { maxAge: 15 * 60 * 1000 });

		if (req.headers["content-type"] === "application/json") {
			res.status(200).json({ user: user, session: token });
		} else {
			res.redirect("/dashboard");
		}
	};

	const errResponse = (err) => {
		res.status(401).json({ message: "Could not login", errors: err.message });
	};

	if (currentSession) {
		currentSession.__v += 1;
		currentSession.createdAt = Date.now();

		currentSession.save().then(loginResponse).catch(errResponse);
	} else {
		const newSession = new SessionModel({ token, user: user._id });

		newSession.save().then(loginResponse).catch(errResponse);
	}
});
// Verify Role
router.get("/logout", verifyToken, getSession, (req, res) => {
	if (!req.userSession?._id) {
		res.clearCookie("stj");
		return res.status(200).json({ message: "No Session. Logged out." });
	}

	SessionModel.findByIdAndDelete(req.userSession._id, (err, doc) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Could not logout", errors: err.message });
		}

		res.clearCookie("stj");

		if (!doc) {
			return res.status(200).json({ message: "Already Logged Out" });
		}

		res.status(200).json({ message: "Success" });
	});
});

module.exports = router;
