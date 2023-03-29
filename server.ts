import express, { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import routes from './routes/routes';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// middlewares
app.use(express.json());

// rotas
app.use(routes);

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API description',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/posts', async (req: Request, res: Response) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  res.json(response.data);
});

app.get('/token', (req: Request, res: Response) => {
  const token = jwt.sign({ id: 1 }, 'secret_key');
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});