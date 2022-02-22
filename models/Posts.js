module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    postText: {
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
    picture: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
