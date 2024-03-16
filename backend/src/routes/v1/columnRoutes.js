import express from "express";
import { columnController } from "~/controllers/columnController";
import { isAuth } from "~/middlewares/authMiddleware";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/")
  .post(isAuth, columnValidation.createNew, columnController.createNew);

Router.route("/:id")
  .put(isAuth, columnValidation.update, columnController.update)
  .delete(isAuth, columnValidation.deleteItem, columnController.deleteItem);

export const columnRoutes = Router;