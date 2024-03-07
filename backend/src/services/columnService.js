import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);
    if (getNewColumn) {
      getNewColumn.cards = [];
      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
}

export const columnService = {
  createNew,
}