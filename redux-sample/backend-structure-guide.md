# Node.js/Express Backend File Structure Guide

## 📁 Project Structure
```
my-backend/
├── package.json          # Project configuration and dependencies
├── server.js             # Main server file (entry point)
├── config/
│   └── database.js       # Database connection setup
├── routes/
│   └── api.js            # API endpoints
├── controllers/
│   └── userController.js # Business logic
├── middleware/
│   └── corsMiddleware.js # CORS configuration
├── utils/
│   └── fileHandler.js    # File system operations
└── .env                  # Environment variables (sensitive data)
```

## 📝 Where to Put Each Code Example

### 1. Express Setup (server.js)
```javascript
// server.js - Main file
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 2. File System (fs) - utils/fileHandler.js
```javascript
// utils/fileHandler.js
const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`);
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    return 'File written successfully';
  } catch (err) {
    throw new Error(`Error writing file: ${err.message}`);
  }
}

module.exports = { readFile, writeFile };
```

### 3. HTTP Module (built into Node.js - used by Express)
No separate file needed - Express uses http internally!

### 4. CORS Middleware - middleware/corsMiddleware.js
```javascript
// middleware/corsMiddleware.js
const cors = require('cors');

// Custom CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);
```

### 5. MySQL Database - config/database.js
```javascript
// config/database.js
const mysql = require('mysql2');

// Create connection pool (better than single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise wrapper for async/await
const promisePool = pool.promise();

module.exports = promisePool;
```

### 6. API Routes - routes/api.js
```javascript
// routes/api.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { readFile } = require('../utils/fileHandler');

// Example route using MySQL
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route using file system
router.get('/read-file', async (req, res) => {
  try {
    const data = await readFile('example.txt');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error reading file');
  }
});

module.exports = router;
```

## 🚀 Setup Commands
```bash
# Create project folder
mkdir my-backend
cd my-backend

# Initialize project
npm init -y

# Install dependencies
npm install express cors mysql2

# Install dev dependency (auto-restart server)
npm install --save-dev nodemon

# Create .env file (for sensitive data)
touch .env
```

## 📋 .env File Content
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=my_database
PORT=3000
```

## 🎯 How to Run
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Each file has a specific purpose and keeps your code organized! 🎉
