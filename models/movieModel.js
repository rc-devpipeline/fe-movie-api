const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
	title: {
		type: String,
		required: true,
	},
	release_date: String,
	cast: Array,
	director: String,
	last_updated: {
		type: Date,
		required: true,
		default: new Date().toTimeString(),
	},
	rating: String,
	submitted_by: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

module.exports = mongoose.model("movie", Movie);
