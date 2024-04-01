import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const CARD_COLLECTION_NAME = 'cards';
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  slug: Joi.string().required().min(3).trim().strict(),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  memberIds: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  attachments: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  comments: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),


  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});

const INVALID_UPDATE_FIELD = ["_id", "boardId"];

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const createNew = async (userId, data) => {
  try {
    const validateData = await validateBeforeCreate(data);
    const newCardToAdd = {
      ...validateData,
      boardId: new ObjectId(validateData.boardId),
      columnId: new ObjectId(validateData.columnId),
      memberIds: [new ObjectId(userId)]
    }

    const createCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newCardToAdd);
    return createCard;
  } catch (err) {
    throw new Error(err);
  }
}

const findOneById = async (cardId) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(cardId)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const update = async (cardId, updateData) => {
  try {
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    if (updateData.columnId) {
      updateData.columnId = new ObjectId(updateData.columnId);
    }
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}


const deleteManyByColumnId = async (columnId) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({
      columnId: new ObjectId(columnId)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteOneById = async (cardId) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(cardId)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update,
  deleteManyByColumnId, deleteOneById
}