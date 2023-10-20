const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nick_name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    nick_name: req.body.code_user,
    email: req.body.code_user,
    password: req.body.password,
    code_user: req.body.code_user
    // ,
    // filename: req.file ? req.file.filename : ""
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

exports.findOne = (req, res) => { };

exports.update = (req, res) => { };

exports.delete = (req, res) => { };