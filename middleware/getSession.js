const SessionModel = require("../models/sessionModel");

async function getSession(req, res, next) {
	try {
		const userId = req.user?._id || req.params?.id || req.body.id;
		const session = await SessionModel.findOne({ user: userId });

		req.userSession = session;

		next();
	} catch (err) {
		res.status(401).json({ message: "No Session found", errors: err.message });
	}
}

module.exports = getSession;
