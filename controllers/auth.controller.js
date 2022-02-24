const { Users } = require("../models");
const { signUpErrors } = require("../utils/errors.utils");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/.env" });

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.signUp = async (req, res) => {
  const { email, password, lastName, firstName, picture, isAdmin } = req.body;

  try {
    // const user = await Users.findOne({ where: { email: email } });
    // if (user) return res.status(200).json({ message: "Utilisateur existant" });
    // const salt = await bcrypt.genSalt(10);
    // const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      email,
      password,
      lastName,
      firstName,
      picture: `../img/random_user.png`,
      isAdmin,
    });
    // const user = await Users.findOne({ where: { email: email } });
    res.status(201).json(user);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      // console.log(error.errors.map((err) => err));
      // console.log(error.errors[0].validatorName.includes("isEmail"));
      // const errorsList = error.errors.map((err) => err);
      console.log(error);
      signUpErrors(error);
      res.status(200).send(signUpErrors(error));
    } else {
      throw error;
    }
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    return res.status(200).json({ error: "Email inconnu" });
  }
  try {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match)
        return res.status(200).json({ error: "Mot de passe incorrect" });
      else {
        const token = createToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user.id });
      }
    });
  } catch (err) {
    res.status(200).send({ err });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};
