import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({ path: './config/config.env' });

// Load environment variables
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS configuration
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ['POST', 'OPTIONS'], // Include OPTIONS method for preflight requests
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount reservation router
app.use('/api/v1/reservation', reservationRouter);

// Establish database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
