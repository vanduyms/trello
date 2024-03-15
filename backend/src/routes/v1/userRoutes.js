import express from "express";
import { StatusCodes } from "http-status-codes";
// import { userController } from "~/controllers/userController";
// import { userValidation } from "~/validations/userValidation";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: API get list users" })
  })

export const userRoutes = Router;