import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Call to model to handle to save record newBoard to database

    return newBoard;

  } catch (error) {
    throw error;
  }
}

export const boardService = {
  createNew
}