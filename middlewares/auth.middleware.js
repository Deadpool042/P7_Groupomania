const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config({ path: "../config" });

exports.checkUsers = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token)
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.clearCookie("jwt");
        next();
      } else {
        let user = await Users.findByPk(decodedToken.id);

        res.locals.user = user;

        next();
      }
    });
  else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Identifié avec l'id" + " " + decodedToken.id);
        next();
      }
    });
  } else {
    res.send(403).json("non autorisé");
  }
};
