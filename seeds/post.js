const sequelize = require("../config/connection");
const { Post } = require("../models");

const postData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
