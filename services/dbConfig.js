/* 
TODO:
 - Error Route page
 - db error handling
*/
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/movie_db";

async function dbInit() {
	return mongoose.connect(MONGO_URI, (err) => {
		if (err) {
			return console.log("Error connecting to db", err);
		}

		console.log("Connected to Movie DB");
	});
}

module.exports = dbInit;
