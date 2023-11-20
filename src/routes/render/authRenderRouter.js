import express from 'express';
import checkNotAuth from '../../middlewares/checkNotAuth';

const authRenderRouter = express.Router();

authRenderRouter.get('/login', checkNotAuth, (req, res) => res.render('Layout'));

authRenderRouter.get('/signup', checkNotAuth, (req, res) => res.render('Layout'));

export default authRenderRouter;
