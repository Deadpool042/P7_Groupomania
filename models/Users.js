const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Champ requis",
        },
        notEmpty: {
          msg: "Champ requis FN",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Champ requis",
        },
        notEmpty: {
          msg: "Champ requis LN",
        },
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      default: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Veuillez renseigner une adresse mail valide",
        },
        notNull: {
          msg: "Veuillez renseigner une adresse mail valide",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "Le mot de passe doit être en 6 et 20 caractères",
        },
        notEmpty: {
          msg: "Champ requis psw",
        },
        notNull: {
          msg: "Champ requis psw",
        },
      },
    },
  });

  Users.beforeCreate(async (user, option) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Users;
};
