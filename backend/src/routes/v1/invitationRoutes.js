import express from "express";
import { invitationController } from "~/controllers/invitationController";
import { isAuth } from "~/middlewares/authMiddleware";
import { invitationValidation } from "~/validations/invitationValidation";
const Router = express.Router();


Router.route("/")
  .post(isAuth, invitationValidation.createNew, invitationController.createNew)

export const invitationRoutes = Router;