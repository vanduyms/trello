import { StatusCodes } from "http-status-codes";
import { invitationService } from "~/services/invitationService";

const createNew = async (req, res, next) => {
  try {
    const createdUser = await invitationService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
};

export const invitationController = {
  createNew,
}