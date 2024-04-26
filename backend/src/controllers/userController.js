import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import { userService } from "~/services/userService";

const createNew = async (req, res, next) => {
  try {
    const createdUser = await userService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.update(userId, req.body);

    res.status(StatusCodes.CREATED).json({ ...updatedUser, password: "" })
  } catch (error) {
    next(error)
  }
};

const searchUserByEmail = async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    let result;
    let user = [];

    if (userEmail) {
      result = await userModel.findOneByEmail(userEmail);
      user = result;
      if (result?._id) user = [result]
    } else {
      result = await userModel.findAllUser(userEmail);
      for await (const doc of result) {
        user.push(doc);
      }
    }

    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}


export const userController = {
  createNew,
  update,
  searchUserByEmail
}