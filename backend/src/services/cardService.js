import { ObjectId } from "mongodb";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdCard = await cardModel.createNew(newCard);
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard);
    }

    return getNewCard;

  } catch (error) {
    throw error;
  }
}

export const cardService = {
  createNew,
}