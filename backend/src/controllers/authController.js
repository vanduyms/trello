import { StatusCodes } from "http-status-codes";
import { authService } from "~/services/authService";

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(req.body);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      .status(StatusCodes.OK)
      .json({
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
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      .status(StatusCodes.CREATED)
      .json({
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
    const access_token = await authService.generateAccessToken(req);
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