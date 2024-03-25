import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const COMMENT_COLLECTION_NAME = 'comments';
const COMMENT_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  userEmail: Joi.string().email().required().trim().strict(),
  userAvatar: Joi.string().required().trim().strict(),
  userDescription: Joi.string().required().trim().strict(),
  userDisplayName: Joi.string().required().trim().strict(),
  content: Joi.string().required().trim().strict(),

  createAt: Joi.date().timestamp('javascript').default(Date.now),
  _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async (data) => {
  return await COMMENT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
  try {
    const validateData = await validateBeforeCreate(data);
    const newCommentToAdd = {
      ...validateData,
      userId: new ObjectId(validateData.userId),
    }

    const createComment = await GET_DB().collection(COMMENT_COLLECTION_NAME).insertOne(newCommentToAdd);
    return createComment;
  } catch (err) {
    throw new Error(err);
  }
}

export const commentModel = {
  createNew,
}