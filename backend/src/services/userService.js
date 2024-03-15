import { userModel } from "~/models/userModel";

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
    };

    const createdUser = await userModel.createNew(newUser);
    const getNewUser = await userModel.findOneById(createdUser.insertedId);

    return getNewUser;

  } catch (error) {
    throw error;
  }
}
export const userService = {
  createNew,
}