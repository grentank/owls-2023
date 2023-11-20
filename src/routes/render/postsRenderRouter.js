import express from 'express';
import { Post } from '../../../db/models';

const postsRenderRouter = express.Router();

postsRenderRouter.get('/', async (req, res) => {
  const posts = await Post.findAll({ include: 'author' });
  res.render('Layout', { posts });
});

postsRenderRouter.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  res.render('Layout', { post });
});

export default postsRenderRouter;
