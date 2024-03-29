import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatter";

const createNew = async (userId, reqBody) => {
  try {
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdCard = await cardModel.createNew(userId, newCard);
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard);
    }

    return getNewCard;

  } catch (error) {
    throw error;
  }
}

const update = async (id, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };


    const updatedCard = await cardModel.update(id, updateData);

    return updatedCard;

  } catch (error) {
    throw error;
  }
}

export const cardService = {
  createNew, update
}