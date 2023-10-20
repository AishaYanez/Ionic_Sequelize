module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    nick_name: {
      type: Sequelize.STRING
    },
    user_code: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }
  });

  return User;
}