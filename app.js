const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const notFound = require("./middlewares/errors/notFoundHandler");
const errorHandler = require("./middlewares/errors/errorHandler");
const userRoutes = require("./api/Auth/routes");
const reminderRoutes = require("./api/Reminder/routes");
const categoryRoutes = require("./api/Category/routes");
const placeRoutes = require("./api/Place/routes");
const config = require("./config/keys");
const passport = require("passport");
const {
  localStrategy,
  jwtStrategy,
} = require("./middlewares/passport/passport");

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

app.use("/api/auth", userRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/place", placeRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

module.exports = app;
