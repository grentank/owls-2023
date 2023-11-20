import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens';
import cookieConfig from '../config/cookieConfig';

require('dotenv').config();

function verifyRefreshToken(req, res, next) {
  const { refreshToken } = req.cookies;
  try {
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ user });
    res
      .cookie('accessToken', accessToken, cookieConfig.access)
      .cookie('refreshToken', newRefreshToken, cookieConfig.refresh);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Invalid refresh token');
  }
}

function verifyAccessToken(req, res, next) {
  const { accessToken } = req.cookies;
  try {
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    verifyRefreshToken(req, res, next);
  }
}

export { verifyAccessToken, verifyRefreshToken };
