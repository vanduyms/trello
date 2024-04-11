import express from "express";
import { userController } from "~/controllers/userController";
import { isAuth } from "~/middlewares/authMiddleware";
import { userValidation } from "~/validations/userValidation";
const Router = express.Router();

Router.route("/")
  .get(userController.searchUserByEmail);

Router.route("/:id/update")
  .put(isAuth, userValidation.update, userController.update)

export const userRoutes = Router;