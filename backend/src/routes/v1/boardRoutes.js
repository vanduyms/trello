import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { isAuth } from "~/middlewares/authMiddleware";
import { boardValidation } from "~/validations/boardValidation";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: API get list boards" })
  })
  .post(isAuth, boardValidation.createNew, boardController.createNew);

Router.route("/:id")
  .get(isAuth, boardController.getDetails)
  .put(isAuth, boardValidation.update, boardController.update)

Router.route("/supports/moving_card")
  .put(isAuth, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn);

Router.route("/owner/:id").get(isAuth, boardController.getBoardsFromOwnerId)
export const boardRoutes = Router;