module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};
