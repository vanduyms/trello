import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const result = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export const boardController = { createNew, getDetails }