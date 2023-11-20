import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../db/models';
import generateTokens from '../../utils/generateTokens';
import cookieConfig from '../../config/cookieConfig';

const apiAuthRouter = express.Router();

apiAuthRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({ message: 'All fields must be non-empty' });

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass: await bcrypt.hash(password, 10) },
    });
    if (!created) return res.status(403).json({ message: 'This email already exists' });

    const user = newUser.get();
    delete user.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie('accessToken', accessToken, cookieConfig.access)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

apiAuthRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Заполни все поля' });

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) return res.status(401).json({ message: 'Такого пользователя нет' });

    const isValidPassword = await bcrypt.compare(password, foundUser.hashpass);
    if (!isValidPassword) return res.status(403).json({ message: 'Неверный пароль' });

    const user = foundUser.get();
    delete user.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie('accessToken', accessToken, cookieConfig.access)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

apiAuthRouter.post('/logout', async (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});

export default apiAuthRouter;
