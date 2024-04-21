import express from "express";
import { StatusCodes } from "http-status-codes";
import { authController } from "~/controllers/authController";
import { userValidation } from "~/validations/userValidation";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: API get list users" })
  })

Router.route("/refresh_token").post(authController.generateAccessToken);
Router.route("/login").post(authController.login);
Router.route("/register").post(userValidation.createNew, authController.register);
Router.route("/forgotPassword").post(authController.sendResetPassword);
Router.route("/resetPassword").post(userValidation.resetPassword, authController.resetPassword);

export const authRoutes = Router;