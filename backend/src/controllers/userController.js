import { StatusCodes } from "http-status-codes";
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


export const userController = { createNew, update }