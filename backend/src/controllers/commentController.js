import { StatusCodes } from "http-status-codes";
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
export const commentController = {
  createNew
}