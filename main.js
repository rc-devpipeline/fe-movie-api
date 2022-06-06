require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const dbInit = require("./services/dbConfig");
const staticRoutes = require("./routes/static/staticRoutes");
const userRoutes = require("./routes/api/userRoutes");
const movieRoutes = require("./routes/api/movieRoutes");
const authRoutes = require("./routes/api/authRoutes");
const sessionRoutes = require("./routes/api/sessionsRoutes");

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware / Config
dbInit();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", staticRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/*/", (_, res) => {
	res.sendFile("no-match.html", { root: "./public/pages" });
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
