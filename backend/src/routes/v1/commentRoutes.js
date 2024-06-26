import express from "express";
import { commentController } from "~/controllers/commentController";
import { isAuth } from "~/middlewares/authMiddleware";
import { commentValidation } from "~/validations/commentValidation";

const Router = express.Router();

Router.route("/")
  .post(isAuth, commentValidation.createNew, commentController.createNew);

Router.route("/card/:id")
  .get(isAuth, commentController.getCommentsOfCardId)

Router.route("/:id")
  .put(isAuth, commentValidation.update, commentController.update)
  .delete(isAuth, commentController.deleteOneById);


export const commentRoutes = Router;