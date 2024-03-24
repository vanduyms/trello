import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/apiError";
import { slugify } from "~/utils/formatter";

const createNew = async (userId, reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    }

    const createdBoard = await boardModel.createNew(userId, newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;

  } catch (error) {
    throw error;
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found !");
    };

    const resBoard = cloneDeep(board);

    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id));
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString());
    });

    delete resBoard.cards;

    return resBoard;
  } catch (err) {
    throw err;
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateBoard = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateBoard);

    return updatedBoard;

  } catch (error) {
    throw error;
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {

    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    });

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    });

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    });
    return {};

  } catch (error) {
    throw error;
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
}