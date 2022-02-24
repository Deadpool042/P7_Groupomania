const { Users } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).json(users);
};

exports.userInfo = async (req, res) => {
  const id = req.params.id;

  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!userInfo) {
    res.status(404).json("Utilisateur inexistant");
  } else {
    res.json(userInfo);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName } = req.body;

  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!userInfo) {
    res.status(404).json("Utilisateur inexistant");
  } else {
    Users.update(
      {
        lastName: lastName,
        firstName: firstName,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).json("Utilisateur modifié");
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password", "isAdmin"] },
  });
  if (!userInfo) {
    res.status(404).json("Utilisateur inexistant");
  } else {
    Users.destroy({
      where: { id: id },
    });
    res.status(200).json("Utilisateur supprimé");
  }
};
