const jwt = require("jsonwebtoken");

const generateToken = async (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "15m",
		algorithm: "HS256",
	});

	return token;
};

module.exports = generateToken;
