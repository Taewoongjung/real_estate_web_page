const express = require('express');
const dotenv = require('dotenv');
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");
const passport = require("passport");

dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require("./passport");

const app = express();
app.set("PORT", process.env.PORT || 8000);
sequelize
    .sync()
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch(console.error);
passportConfig();
const prod = process.env.NODE_ENV === "production";

if (prod) {
    app.enable("trust proxy");
    app.use(morgan("combined"));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan("dev"));
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
}
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
};
if (prod) {
    sessionOption.cookie.secure = true;
    sessionOption.cookie.proxy = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

const server = app.listen(app.get("PORT"), () => {
    console.log(`listening on port ${app.get("PORT")}`);
});

module.exports = app;