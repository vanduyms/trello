import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/apiError";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;

  } catch (error) {
    throw error;
  }
}

const getDetails = async (boardId) => {
  try {
    const board = boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found !");
    }
    return board;
  } catch (err) {
    throw err;
  }
}

export const boardService = {
  createNew,
  getDetails
}