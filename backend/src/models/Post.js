const { DataTypes } = require("sequelize");
const sequelize = require("../instances/mysql");

const Post = sequelize.define(
  "Posts",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    autor: {
      type: DataTypes.STRING,
    },
    postagem: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "posts",
  }
);

module.exports = Post;
