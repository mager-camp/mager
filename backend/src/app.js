import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
const app = express();
const swaggerDocument = JSON.parse(
  fs.readFileSync('./swagger-output.json', 'utf-8')
);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100
//   })
// );

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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