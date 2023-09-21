const User = require("./User");
const Posts = require("./Posts");
const Dashboard = require("./Dashboard");

Dashboard.hasMany(Posts, {
  foreignKey: "dashboard_id",
});

Posts.belongsTo(Dashboard, {
  foreignKey: "gallery_id",
});

module.exports = { User, Posts, Dashboard };
