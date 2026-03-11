import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.route.js'
import authRoutes from './routes/auth.route.js';
import tasksRoutes from './routes/tasks.route.js';
import {authenticateToken} from './middlewares/authenticate.middleware.js';
import {swaggerDocs} from './config/swagger.js';
import env from './config/env.js';

const app = express();

app.use(morgan('combined'));
app.use(express.json());

app.use('/api/users/', usersRoutes)
app.use('/api/tasks/', authenticateToken, tasksRoutes)
app.use('/api/login', authRoutes)

swaggerDocs(app, env.db_port);
export default app;
