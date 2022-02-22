module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Likes;
};
