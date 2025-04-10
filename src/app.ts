import express, { Application } from 'express';
import cors from 'cors';

import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

//parsers

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

//applications routes
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('welcome to my project');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
