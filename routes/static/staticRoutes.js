const router = require("express").Router();

const root = { root: "./public/pages" };
const verifyToken = require("../../middleware/verifyToken");

// index
router.get("/", (req, res) => {
	res.sendFile("index.html");
});

// login
router.get("/login", (req, res) => {
	res.sendFile("login.html", root);
});

// dashboard
router.get("/dashboard", verifyToken, (req, res) => {
	res.send("dashboard.html");
});

// forbidden
router.get("/forbidden", (req, res) => {
	res.sendFile("forbidden.html", root);
});

module.exports = router;
