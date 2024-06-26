import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { BOARD_TYPES } from "~/utils/constants";
import { cardModel } from "./cardModel";
import { columnModel } from "./columnModel";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { commentModel } from "./commentModel";
import { userModel } from "./userModel";

const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  type: Joi.string().valid(...Object.values(BOARD_TYPES)).required(),

  ownerIds: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).strict(),
  memberIds: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  columnOrderIds: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});

const INVALID_UPDATE_FIELD = ["_id", "createdAt"];

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const createNew = async (userId, data) => {
  try {
    const validateData = await validateBeforeCreate(data);
    const boardData = {
      ...validateData,
      ownerIds: new ObjectId(userId),
    }
    const createBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(boardData);
    return createBoard;
  } catch (err) {
    throw new Error(err);
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const findByTitle = async (search) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).find({
      title: { $regex: search, $options: 'i' }
    });


    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const findByOwnerId = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).find({
      ownerIds: new ObjectId(id)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const findByMemberId = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).find({
      memberIds: [new ObjectId(id)]
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: new ObjectId(id),
          _destroy: false,
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          let: { user_id: "$memberIds" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$user_id"],
                },
              },
            },
          ],
          as: "members",
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          let: { user_id: "$ownerIds" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
          ],
          as: "ownerUser",
        }
      },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: "_id",
          foreignField: "boardId",
          as: "columns"
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: "_id",
          foreignField: "boardId",
          as: "cards",
          pipeline: [
            {
              $lookup: {
                from: commentModel.COMMENT_COLLECTION_NAME,
                let: { card_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$cardId", "$$card_id"],
                      },
                    },
                  },
                  {
                    $sort: { "createdAt": -1 }
                  }
                ],
                as: "comments",
              },
            },


          ]
        }
      },

    ]).toArray();

    return result[0] || null;
  } catch (err) {
    throw new Error(err);
  }
}

const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: column.boardId },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const update = async (boardId, updateData) => {
  try {
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete updateData[fieldName];
      }
    });

    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map(_id => (new ObjectId(_id)));
    }

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const pullColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: column.boardId },
      { $pull: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) },
      { returnDocument: "after" }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update,
  pullColumnOrderIds,
  findByOwnerId,
  findByMemberId,
  findByTitle,
  deleteOneById
}