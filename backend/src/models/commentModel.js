import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const COMMENT_COLLECTION_NAME = 'comments';
const COMMENT_COLLECTION_SCHEMA = Joi.object({
  cardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  userEmail: Joi.string().email().required().trim().strict(),
  userAvatar: Joi.string().required().trim().strict(),
  userDescription: Joi.string().required().trim().strict(),
  userDisplayName: Joi.string().required().trim().strict(),
  content: Joi.string().required().trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

const INVALID_UPDATE_FIELD = ["_id", "cardId", "userId"];

const validateBeforeCreate = async (data) => {
  return await COMMENT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
  try {
    const validateData = await validateBeforeCreate({ ...data, userId: String(data.userId) });
    const newCommentToAdd = {
      ...validateData,
      userId: new ObjectId(validateData.userId),
      cardId: new ObjectId(validateData.cardId),
    }

    const createComment = await GET_DB().collection(COMMENT_COLLECTION_NAME).insertOne(newCommentToAdd);
    return createComment;
  } catch (err) {
    throw new Error(err);
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const getCommentsOfCardId = async (cardId) => {
  try {
    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).find({
      cardId: new ObjectId(cardId)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteOneById = async (id) => {
  try {
    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteManyByCardId = async (cardId) => {
  try {
    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).deleteMany({
      cardId: new ObjectId(cardId)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}


const update = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export const commentModel = {
  COMMENT_COLLECTION_NAME,
  COMMENT_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getCommentsOfCardId,
  deleteOneById,
  deleteManyByCardId,
  update
}