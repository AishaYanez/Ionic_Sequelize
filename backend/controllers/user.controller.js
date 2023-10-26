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
    nick_name: req.body.nick_name,
    email: req.body.email,
    password: req.body.password,
    user_code: req.body.user_code,
    filename: req.file ? req.file.filename : ""
  };

  User.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user."
    })
  });
};

exports.findOne = (req, res) => {
  const userEmail = req.params.email;
  User.findOne({ where: { email: userEmail } })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: "User not found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user by email: " + err.message
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user."
    })
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const user = {
    nick_name: req.body.nick_name,
    email: req.body.email,
    password: req.body.password,
    user_code: req.body.user_code,
    filename: req.file || ""
  };

  console.log(user.email + "     " + user.filename);

  User.update(user, {
    where: { id: id }
  })

    .then(num => {
      if (num == 1) {
        return res.send({
          message: "User was updated successfully."
        });
      } else {
        return res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).json({
          message: "User was deleted successfully."
        });
      } else {
        res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error deleting User with id=" + id
      });
    });
};