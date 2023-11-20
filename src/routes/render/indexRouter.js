import express from 'express';
import { verifyAccessToken } from '../../middlewares/verifyTokens';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.render('Layout'));

indexRouter.get('/account', verifyAccessToken, (req, res) => res.render('Layout'));

indexRouter.get('/not-found', (req, res) => res.sendStatus(404));

export default indexRouter;
