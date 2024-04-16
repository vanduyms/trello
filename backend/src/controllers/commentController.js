import { StatusCodes } from "http-status-codes";
import { commentModel } from "~/models/commentModel";
import { commentService } from "~/services/commentService";

const createNew = async (req, res, next) => {
  try {
    const createdComment = await commentService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdComment)
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
    const createdComment = await commentService.update(id, req.body);

    res.status(StatusCodes.CREATED).json(createdComment)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};

const getCommentsOfCardId = async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const comments = [];

    const result = await commentModel.getCommentsOfCardId(cardId);
    for await (const doc of result) {
      comments.push(doc);
    }
    res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    next(error)
  }
}

const deleteOneById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await commentModel.deleteOneById(id);

    res.status(StatusCodes.OK).json({ msg: "Deleted success!" });
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
};
export const commentController = {
  createNew,
  update,
  getCommentsOfCardId,
  deleteOneById
}