const express = require("express");

const router = express.Router();
const SessionModel = require("../../models/sessionModel");

router.get("/", (req, res) => {
	SessionModel.find((err, result) => {
		res.status(200).json(result);
	});
});

module.exports = router;
