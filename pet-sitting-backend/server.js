import express from 'express';
import cors     from 'cors';
import 'dotenv/config.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`API ready on http://localhost:${process.env.PORT}`)
);
