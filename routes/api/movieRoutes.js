const express = require("express");

const MovieModel = require("../../models/movieModel");
const router = express.Router();

// GET
router.get("/", (req, res) => {
	try {
		MovieModel.find()
			.populate("user")
			.exec((err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).json({ errors: err.toString() });
				}

				res.status(200).json(result);
			});
	} catch (err) {
		res.status(500).json({ errors: err.toString() });
	}
});

// GET One
router.get("/:id", (req, res) => {
	try {
		MovieModel.findById(req.params.id, (err, result) => {
			if (err) {
				return res.status(400).json({ errors: err });
			}

			res.status(200).json(result);
		});
	} catch (err) {
		res.status(500).json({ errors: err });
	}
});

// POST one
router.post("/add-one", (req, res) => {
	const newMovie = new MovieModel(req.body);

	newMovie
		.save()
		.then((movie) => {
			res.status(200).json(movie);
		})
		.catch((err) => {
			res.status(500).json({ message: "Could not add movie", errors: err });
		});
});

// PUT
// DELETE
router.delete("/remove/:id", (req, res) => {
	UserModel.findOneAndRemove({ _id: req.params.id }, {}, (err, doc) => {
		if (err) {
			return res
				.status(400)
				.json({ message: "Could not process request", errors: err.message });
		}

		res.status(200).json({ message: "Success" });
	});
});

module.exports = router;
