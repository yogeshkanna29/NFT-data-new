const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/usersController")

usersRouter.route("/")
    .get(usersController.getUser)
    .post(usersController.createUser);
usersRouter.route("/:id")
    .get(usersController.getSingleUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = usersRouter;