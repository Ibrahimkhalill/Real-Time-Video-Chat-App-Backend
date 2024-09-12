const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      id_quiz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quiz: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quiz_mark: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Quiz;
};
