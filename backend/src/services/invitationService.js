import { invitationModel } from "~/models/invitationModel";

const createNew = async (reqBody) => {
  try {
    const createdInvitation = await invitationModel.createNew(reqBody);
    const getNewInvitation = await invitationModel.findOneById(createdInvitation.insertedId);

    return getNewInvitation;

  } catch (error) {
    throw error;
  }
}

export const invitationService = {
  createNew
}