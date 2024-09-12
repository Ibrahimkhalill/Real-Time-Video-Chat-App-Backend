const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  define: {
    freezeTableName: true,
  },
  define: {
    timestamps: false, // Disable timestamps for all models
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const Content = require("./Content")(sequelize, Sequelize);
const Course = require("./Course")(sequelize, Sequelize);
const Feedback = require("./Feedback")(sequelize, Sequelize);
const Quiz = require("./Quiz")(sequelize, Sequelize);
const Lecture = require("./Lecture")(sequelize, Sequelize);
const Student = require("./Student")(sequelize, Sequelize);

//faq foreignkey

// Export the sequelize object along with the models
module.exports = {
  sequelize,
  Course,
  Content,
  Feedback,
  Quiz,
  Lecture,
  Student,
};
