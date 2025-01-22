import * as path from "jsr:@std/path";
import createError from "npm:http-errors";
import express from "npm:express";
import engine from "npm:ejs-mate";
import cookieParser from "npm:cookie-parser";
import logger from "npm:morgan";
import session from "npm:express-session";
import passport from "npm:passport";
import override from "npm:method-override";

import mongoose from "#/database/mongoose.js";
import seed from "#/database/seed.js";
import middlewares from "#/middlewares/index.js";
import routers from "#/routes/index.js";

import User from "#/models/User.js";

const app = express();

// View engine setup
app.engine("ejs", engine);
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// Middlewares:
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(override("_method"));

// Session configuration:
app.use(session({
  secret: "#SECRET#",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local variables middlewares
app.use(middlewares.locals);

// Mount routes
app.use("/", routers.authentication);
app.use("/users", routers.users);
app.use("/posts", routers.posts);
app.use("/posts/:post/reviews", routers.reviews);

// Catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// Error handler
app.use((error, request, response, next) => {
  /*
  // Set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  // Render the error page
  response.status(error.status || 500);
  response.render("error");
  */
  console.error(error);
  request.session.messages = { error: error.message };
  response.redirect("back");
});

app.listen(3000, () => {
  mongoose.connect()
    .then(async () => {
      console.log("The connection to the database has been successfully established.");
      process.env.ENVIRONMENT === "development" && await seed();
    })
    .catch((error) => {
      console.error("Connection error:", error);
    });
  console.log("Server is running on http://localhost:3000.");
});
