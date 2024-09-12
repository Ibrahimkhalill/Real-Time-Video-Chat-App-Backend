const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Content = sequelize.define(
    "Content",
    {
      id_content: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      course_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Content;
};
