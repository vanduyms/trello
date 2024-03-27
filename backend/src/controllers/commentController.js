import { StatusCodes } from "http-status-codes";
import { commentModel } from "~/models/commentModel";
import { commentService } from "~/services/commentService";

const createNew = async (req, res, next) => {
  try {
    const user = req.user;
    const createdComment = await commentService.createNew(user, req.body);

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
export const commentController = {
  createNew,
  getCommentsOfCardId
}