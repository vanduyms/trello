import { StatusCodes } from "http-status-codes";
import { cardService } from "~/services/cardService";

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const createdCard = await cardService.update(id, req.body);

    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

export const cardController = { createNew, update }