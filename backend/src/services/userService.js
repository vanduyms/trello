import { userModel } from "~/models/userModel";

const createNew = async (reqBody) => {
  try {
    const createdUser = await userModel.createNew(reqBody);
    const getNewUser = await userModel.findOneById(createdUser.insertedId);

    return getNewUser;

  } catch (error) {
    throw error;
  }
}


const update = async (userId, reqBody) => {
  try {
    const updateUser = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedUser = await userModel.update(userId, updateUser);

    return updatedUser;

  } catch (error) {
    throw error;
  }
}

export const userService = {
  createNew,
  update
}