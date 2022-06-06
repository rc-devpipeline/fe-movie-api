const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	const token = req.cookies.stj || null;

	try {
		if (!token) {
			if (req.headers["content-type"] === "application/json") {
				return res.status(401).json({ message: "No Session" });
			} else {
				return res.redirect("/login");
			}
		}

		const decrypt = jwt.verify(token, process.env.JWT_SECRET, {
			algorithms: "HS256",
		});

		req.user = {
			...decrypt,
		};

		next();
	} catch (error) {
		res.clearCookie("stj");
		if (req.headers["content-type"] === "application/json") {
			return res
				.status(401)
				.json({ message: "Invalid Credentials", errors: error.message });
		} else {
			return res.redirect("/login");
		}
	}
}

module.exports = verifyToken;
