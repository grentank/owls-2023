import express from 'express';
import { Post, User } from '../../../db/models';
import { verifyAccessToken } from '../../middlewares/verifyTokens';
import checkIsAuthor from '../../middlewares/checkIsAuthor';

const apiPostsRouter = express.Router();

apiPostsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error adding the post' });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const newPost = await Post.create({ ...req.body, userId: res.locals.user.id });
      const newPostWithAuthor = await Post.findByPk(newPost.id, { include: User });
      res.json(newPostWithAuthor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error adding the post' });
    }
  });

apiPostsRouter
  .route('/:id')
  .delete(checkIsAuthor, async (req, res) => {
    try {
      await Post.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting the post' });
    }
  })
  .patch(async (req, res) => {
    try {
      await Post.update(req.body, { where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating the post' });
    }
  });

export default apiPostsRouter;
