const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	user_name: {
		type: String,
		unique: true,
	},
	// movies: [{ type: Schema.Types.ObjectId, ref: "movie" }],
	role: {
		type: String,
		required: true,
		default: "user",
		enum: ["user", "super-admin", "admin"],
	},
});

module.exports = mongoose.model("user", User);
