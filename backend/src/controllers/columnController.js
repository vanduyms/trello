import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;
    console.log(columnId)
    const updatedColumn = await columnService.update(columnId, req.body);

    res.status(StatusCodes.CREATED).json(updatedColumn)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

export const columnController = { createNew, update }