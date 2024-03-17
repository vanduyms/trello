import { verifyToken } from "~/utils/jwt.helper";
import { env } from "~/config/environment";
import { userModel } from "~/models/userModel";

export const isAuth = async (req, res, next) => {
  // Remove Bearer before token
  const token = req.header("Authorization");
  if (token) {
    try {
      const decoded = await verifyToken(token.slice(7), env.ACCESS_TOKEN_SECRET);
      const user = await userModel.findOneById(decoded.data._id);
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};