import express from "express";
import { cardController } from "~/controllers/cardController";
import { isAuth } from "~/middlewares/authMiddleware";
import { cardValidation } from "~/validations/cardValidation";

const Router = express.Router();

Router.route("/")
  .post(isAuth, cardValidation.createNew, cardController.createNew);

export const cardRoutes = Router;