const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      course_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Course;
};
