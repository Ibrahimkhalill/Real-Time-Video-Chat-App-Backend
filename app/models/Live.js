const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Live = sequelize.define(
    "Live",
    {
      id_Live: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      live_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      live_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Disable timestamps
    }
  );

  return Live;
};
