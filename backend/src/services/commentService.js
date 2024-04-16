import { commentModel } from "~/models/commentModel";

const createNew = async (data) => {
  try {
    const createdComment = await commentModel.createNew(data);
    const getNewComment = await commentModel.findOneById(createdComment.insertedId);

    return getNewComment;

  } catch (error) {
    throw error;
  }
}

const update = async (id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updatedComment = await commentModel.update(id, updateData);
    return updatedComment;

  } catch (error) {
    throw error;
  }
}

export const commentService = {
  createNew, update
}