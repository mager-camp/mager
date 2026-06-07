import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API running'
  });
});

app.use('/api/v1', routes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorMiddleware);

export default app;