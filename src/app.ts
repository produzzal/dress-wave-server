import express, { Application } from 'express';
import cors from 'cors';

import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

//parsers

app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000', 'https://dresswave.onrender.com'], // Allow both localhost and your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

//applications routes
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('welcome to my project');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
