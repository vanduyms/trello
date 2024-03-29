import { StatusCodes } from "http-status-codes";
import { cardModel } from "~/models/cardModel";
import { cardService } from "~/services/cardService";

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.user._id, req.body);

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

    res.status(StatusCodes.OK).json(createdCard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const deleteOneById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await cardModel.deleteOneById(id);

    res.status(StatusCodes.OK).json({ msg: "Deleted success!" });
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

export const cardController = { createNew, update, deleteOneById }