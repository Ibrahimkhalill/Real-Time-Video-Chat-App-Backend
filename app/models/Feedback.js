const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      id_feedback: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Feedback;
};
