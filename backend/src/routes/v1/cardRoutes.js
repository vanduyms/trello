import express from "express";
import { cardController } from "~/controllers/cardController";
import { cardValidation } from "~/validations/cardValidation";

const Router = express.Router();

Router.route("/")
  .post(cardValidation.createNew, cardController.createNew);

export const cardRoutes = Router;