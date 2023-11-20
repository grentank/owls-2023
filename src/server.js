import express from 'express';
import morgan from 'morgan';
import path from 'path';
import jsxRender from './utils/jsxRender';
import resLocals from './middlewares/resLocals';
import authRenderRouter from './routes/render/authRenderRouter';
import indexRouter from './routes/render/indexRouter';
import postsRenderRouter from './routes/render/postsRenderRouter';
import apiAuthRouter from './routes/api/apiAuthRouter';
import apiPostsRouter from './routes/api/apiPostsRouter';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(resLocals);

app.use('/', indexRouter);
app.use('/auth', authRenderRouter);
app.use('/posts', postsRenderRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/posts', apiPostsRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
