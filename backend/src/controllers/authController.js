import { StatusCodes } from "http-status-codes";
import { authService } from "~/services/authService";

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(req.body);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: true,
        path: '/v1/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(StatusCodes.OK)
      .json({
        // msg: "Login success!",
        accessToken,
        user: {
          ...user,
          password: ''
        }
      });
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

const register = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.register(req.body);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: true,
        path: '/v1/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(StatusCodes.CREATED)
      .json({
        // msg: "Register success!",
        accessToken,
        user: {
          ...user,
          password: ''
        }
      });
  } catch (error) {
    next(error);
  }
}

const generateAccessToken = async (req, res, next) => {
  try {
    const access_token = await authService.generateAccessToken();
    res.status(StatusCodes.CREATED).json({ access_token: access_token });
  } catch (error) {
    next(error);
  }
}

export const authController = {
  login,
  register,
  generateAccessToken
}