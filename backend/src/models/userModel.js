import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import bcrypt from "bcrypt";

const USER_COLLECTION_NAME = 'users';
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().required().strict(),

  username: Joi.string().required().strict(),
  displayName: Joi.string().optional(),

  avatar: Joi.string().default(""),
  role: Joi.string().default("client"),

  isActive: Joi.boolean().default(false),
  verifyToken: Joi.string().default(null),

  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updateAt: Joi.date().timestamp("javascript").default(null)
});

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false, allowUnknown: true });
}

const createNew = async (data) => {
  try {
    const validateData = await validateBeforeCreate(data);

    const checkEmail = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: validateData.email });

    const checkUsername = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: validateData.username });

    if (checkEmail) throw new Error("This email is exist!");
    if (checkUsername) throw new Error("This username is exist!");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validateData.password, salt);
    const dataHash = {
      ...validateData,
      password: passwordHash
    };

    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(dataHash);
    return createdUser;

  } catch (err) {
    throw new Error(err);
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

const findOneByEmail = async (email) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email });

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  findOneByEmail
}