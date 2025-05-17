import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';

import distributeRoutes from './routes/distributeRoutes.js';
import authRouter from './routes/auth.js';
import agentRouter from './routes/agents.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register routes BEFORE listen
app.use('/api/auth', authRouter);
app.use('/api/agents', agentRouter);
app.use('/api', distributeRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
