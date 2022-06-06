const express = require("express");
const bcrypt = require("bcrypt");

const UserModel = require("../../models/userModel");
const router = express.Router();

// GET
router.get("/", (req, res) => {
	try {
		UserModel.find({}, { password: 0, __V: 0 }, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({ errors: err });
			}

			res.status(200).json(result);
		});
	} catch (err) {
		res.status(500).json({ errors: err });
	}
});

// GET One
router.get("/:id", (req, res) => {
	try {
		UserModel.findOne(
			{ _id: req.params.id },
			{ password: 0, __v: 0 },
			(err, result) => {
				if (err) {
					return res.status(400).json({ errors: err });
				}

				res.status(200).json(result);
			}
		);
	} catch (err) {
		res.status(500).json({ errors: err });
	}
});

// POST one
router.post("/add-one", async (req, res) => {
	const newUser = new UserModel(req.body);

	try {
		const hashedPass = await bcrypt.hash(newUser.password, 10);

		newUser.password = hashedPass;
	} catch (error) {
		return res
			.status(400)
			.json({ message: "Malformed password, try again.", errors: err });
	}

	newUser
		.save()
		.then((user) => {
			const filteredFields = user.toObject();
			delete filteredFields.password;
			delete filteredFields["__v"];

			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ message: "Could not add user", errors: err });
		});
});

// PUT
// DELETE
router.delete("/remove/:id", (req, res) => {
	UserModel.findOneAndRemove({ _id: req.params.id }, {}, (err, doc) => {
		if (err) {
			return res
				.status(400)
				.json({ message: "Could not process request", errors: err });
		}

		res.status(200).json({ message: "Success" });
	});
});

module.exports = router;
