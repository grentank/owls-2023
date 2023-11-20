import { Post } from '../../db/models';

export default async function checkIsAuthor(req, res, next) {
  const { id } = req.params;
  const targetPost = await Post.findByPk(id);
  if (targetPost.userId !== res.locals?.user.id) return res.sendStatus(403);
  next();
}
