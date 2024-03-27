import express from "express";
import { commentController } from "~/controllers/commentController";
import { isAuth } from "~/middlewares/authMiddleware";
import { commentValidation } from "~/validations/commentValidation";

const Router = express.Router();

Router.route("/")
  .post(isAuth, commentValidation.createNew, commentController.createNew);


export const commentRoutes = Router;