
const sequelize = require("./config/connection");
sequelize.sync({ force: false }).then(() => {
    console.log("connected to database");
});
