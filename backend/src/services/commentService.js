import { commentModel } from "~/models/commentModel";

const createNew = async (user, reqBody) => {
  try {
    const newComment = {
      userId: user._id,
      userEmail: user.email,
      userAvatar: user.avatar || "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
      userDescription: "Hello everyone",
      userDisplayName: user.username,
      content: reqBody.content,
      cardId: reqBody.cardId,
    }

    const createdComment = await commentModel.createNew(newComment);
    const getNewComment = await commentModel.findOneById(createdComment.insertedId);

    return getNewComment;

  } catch (error) {
    throw error;
  }
}

export const commentService = {
  createNew,
}