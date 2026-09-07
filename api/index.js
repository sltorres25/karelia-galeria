import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiRoutes from '../server/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Mount API routes
app.use('/api', apiRoutes);

export default app;
