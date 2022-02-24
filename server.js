const express = require("express");
// import express from "express";

const bodyParser = require("body-parser");
// import bodyParser from "body-parser";
const cookieParker = require("cookie-parser");
// import cookieParser from "cookie-parser";
const userRoutes = require("./routes/user.routes");
// import userRoutes from "./routes/user.routes";
// const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/posts.routes");

const { checkUsers, requireAuth } = require("./middlewares/auth.middleware");
const db = require("./models");
// const cors = require("cors");

require("dotenv").config({ path: "./config/.env" });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParker());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//jwt
app.get("*", checkUsers);
app.get("/jwtid", requireAuth, (req, res) => {
  res.json(res.locals.user.id);
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

db.sequelize
  .sync()

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
