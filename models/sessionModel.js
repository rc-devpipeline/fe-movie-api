const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
	token: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
		expires: 60 * 15,
	},
});

module.exports = mongoose.model("session", Session);
