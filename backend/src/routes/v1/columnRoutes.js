import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/")
  .post(columnValidation.createNew, columnController.createNew);

export const columnRoutes = Router;