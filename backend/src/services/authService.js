import { env } from "../config/environment";
import { userService } from "~/services/userService";
import { generateToken } from "~/utils/jwt.helper";
import { userModel } from "~/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (reqBody) => {
  try {
    const { email, password } = reqBody;

    const user = await userModel.findOneByEmail(email);
    if (!user) throw new Error("This email is not exist!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("The password is incorrect!");

    const accessToken = await generateToken(user, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE);
    const refreshToken = await generateToken(user, env.REFRESH_TOKEN_SECRET, env.REFRESH_TOKEN_LIFE);

    return { accessToken, refreshToken, user }

  } catch (error) {
    throw (error);
  }
}

const register = async (reqBody) => {
  try {
    const user = await userService.createNew(reqBody);

    const accessToken = await generateToken(user, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE);
    const refreshToken = await generateToken(user, env.REFRESH_TOKEN_SECRET, env.REFRESH_TOKEN_LIFE);

    return { accessToken, refreshToken, user }

  } catch (error) {
    throw (error);
  }
}

const generateAccessToken = async (reqBody) => {
  try {
    const rft = reqBody.cookies.refreshToken;
    if (!rft) throw new Error("Please login now!");


    const result = await jwt.verify(rft, env.REFRESH_TOKEN_SECRET);

    const user = await userModel.findOneById(result.data._id);

    if (!user) throw new Error("This does not exist!");

    const access_token = await generateToken(user, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE);

    return access_token;
  } catch (error) {
    throw (error);
  }
}

export const authService = {
  login,
  register,
  generateAccessToken
}