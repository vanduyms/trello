import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const createdBoard = await boardService.createNew(userId, req.body);

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const getBoardsOwnerMember = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const memberId = req.params.id;

    const boardsIsOwner = [];
    const boardsIsMember = [];

    const resultOwner = await boardModel.findByOwnerId(ownerId);
    const resultMember = await boardModel.findByMemberId(memberId);

    for await (const doc of resultOwner) {
      boardsIsOwner.push(doc);
    }
    for await (const doc of resultMember) {
      boardsIsMember.push(doc);
    }
    res.status(StatusCodes.OK).json({
      boardsIsOwner: boardsIsOwner,
      boardsIsMember: boardsIsMember,
    });
  } catch (error) {
    next(error)
  }
}

const getBoardsFromTitle = async (req, res, next) => {
  try {
    const title = req.query.title;
    const boards = [];

    const result = await boardModel.findByTitle(title);
    for await (const doc of result) {
      boards.push(doc);
    }
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const result = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const updatedBoard = await boardService.update(boardId, req.body);
    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export const boardController = {
  createNew,
  getBoardsOwnerMember,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getBoardsFromTitle
}