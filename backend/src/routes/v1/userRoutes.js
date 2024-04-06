import express from "express";
import { StatusCodes } from "http-status-codes";
import { userController } from "~/controllers/userController";
import { userValidation } from "~/validations/userValidation";
const Router = express.Router();

Router.route("/")
  .get(userController.searchUserByEmail);

Router.route("/:id/update")
  .put(userValidation.update, userController.update)

export const userRoutes = Router;