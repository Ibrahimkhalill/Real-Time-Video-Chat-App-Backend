const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      id_student: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return Student;
};
