import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/database.js';
import { initFileStore } from './storage/fileStore.js';
import logger from './utils/logger.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import uploadRoutes from './routes/upload.js';
import { errorHandler } from './middleware/errorHandler.js';

// ES module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Storage mode
if (process.env.USE_FILE_DB === 'true') {
  logger.log('🗂️ Using file-based storage (no MongoDB)');
  initFileStore();
} else {
  connectDB();
}

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration with dynamic origins
const defaultDevOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'];
const allowedOrigins = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
const origins = process.env.NODE_ENV === 'production'
  ? allowedOrigins.length ? allowedOrigins : ['https://your-frontend-domain.com']
  : [...new Set([...defaultDevOrigins, ...allowedOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow non-browser like curl
    if (origins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed for origin: ' + origin));
  },
  credentials: true
}));

logger.log('🔐 CORS allowed origins:', origins);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  logger.log(`🚀 Server running on port ${PORT}`);
  logger.log(`📊 Environment: ${process.env.NODE_ENV}`);
  logger.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

export default app;