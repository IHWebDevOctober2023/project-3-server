require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const familyRoutes = require("./routes/family.routes");
app.use("/family", familyRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/family", taskRoutes);

require("./error-handling")(app);

module.exports = app;
