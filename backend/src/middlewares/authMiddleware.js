import { verifyToken } from "~/utils/jwt.helper";
import { env } from "~/config/environment";
const debug = console.log.bind(console);

export const isAuth = async (req, res, next) => {
  // Get token is sent from client
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

  if (tokenFromClient) {
    try {
      const decoded = verifyToken(tokenFromClient, env.ACCESS_TOKEN_SECRET);
      req.jwtDecoded = decoded;

      next();
    } catch (error) {
      debug("Error while verify token:", error);
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