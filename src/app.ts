import express, { Application } from 'express';
import cors from 'cors';

import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

//parsers

app.use(express.json());
const allowedOrigins = [
  'https://dresswave.onrender.com',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
