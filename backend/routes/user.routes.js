module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  router.post("/", upload.single('file'), users.create);

  router.get("/", users.findAll);

  router.get("/:email", users.findOne);

  router.put("/:id", upload.single('file'), users.update);

  router.delete("/:id", users.delete);

  app.use('/api/users', router);
}