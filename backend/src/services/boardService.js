import { boardModel } from "~/models/boardModel";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard);
    // console.log(createdBoard);

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    console.log(getNewBoard)


    // Call to model to handle to save record newBoard to database

    return getNewBoard;

  } catch (error) {
    throw error;
  }
}

export const boardService = {
  createNew
}