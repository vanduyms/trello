import { env } from "../config/environment";
import { userService } from "~/services/userService";
import { generateToken } from "~/utils/jwt.helper";
import { userModel } from "~/models/userModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "~/utils/email";

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

const sendResetPassword = async (reqBody) => {
  try {
    const email = reqBody.email;
    const user = await userModel.findOneByEmail(email);

    if (!user) throw new Error("This email is not exist !");

    let resetToken = await crypto.randomBytes(32).toString("hex");
    resetToken = await bcrypt.hash(resetToken, 12);
    const resetTokenExpires = Date.now() + 3600000;

    await userModel.sendResetToken(user._id, resetToken, resetTokenExpires);

    const link = `${env.BASE_URL}/resetPassword?id=${user._id}&resetToken=${resetToken}`;
    await sendEmail(user.email, "Password reset", link);

    return {
      resetToken: resetToken,
      id: user._id
    };
  } catch (error) {
    throw (error);
  }
}

const resetPassword = async (reqQuery, reqBody) => {
  try {
    const { id, resetToken } = reqQuery;
    const userResetPassword = await userModel.findOneByIdAndResetToken(id, resetToken);
    if (!userResetPassword) throw new Error("Invalid link or expired");

    const password = await bcrypt.hash(reqBody.password, 12);

    const result = await userModel.update(userResetPassword._id, { password: password, resetToken: null, resetTokenExpires: null });

    return { user: { ...result, password: "" } }
  } catch (err) {
    throw (err);
  }
}

export const authService = {
  login,
  register,
  generateAccessToken,
  sendResetPassword,
  resetPassword
}