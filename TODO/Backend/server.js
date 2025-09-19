const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

// Database connection with error handling
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql@SR27',
  database: 'todo_app',
  port: 3306
});

let dbConnected = false;

db.connect((err) => {
  if (err) {
    console.log("Error in connecting the database:", err.message);
    console.log("Server will continue without database connection");
    return;
  }
  console.log("Database connected successfully");
  dbConnected = true;
});

// Helper function to check database connection
const checkDbConnection = () => {
  if (!dbConnected) {
    throw new Error("Database not connected");
  }
};

app.listen(port, (err) => {
  if (err) {
    console.log("Error listening to port");
    return;
  }
  console.log(`Successfully listening from port ${port}`);
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to your TODO API server",
    endpoints: {
      "GET /": "API information",
      "GET /items": "Get all todo items",
      "POST /additem": "Add a new todo item",
      "DELETE /items/:id": "Delete a todo item"
    },
    status: "Server running",
    database: dbConnected ? "Connected" : "Disconnected"
  });
});

// Get all todo items
app.get("/items", (req, res) => {
  try {
    checkDbConnection();

    const sql = "SELECT * FROM todoItems ORDER BY id DESC";

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching data from DB:", err.message);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch todo items",
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: "Todo items retrieved successfully",
        data: results
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database not connected",
      error: error.message
    });
  }
});

// Add new todo item
app.post('/additem', (req, res) => {
  try {
    const { inputValue } = req.body;

    if (!inputValue || inputValue.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Task cannot be empty"
      });
    }

    checkDbConnection();

    const sql = "INSERT INTO todoItems (itemDescription) VALUES (?)";

    db.query(sql, [inputValue], (err, result) => {
      if (err) {
        console.error("Error inserting data into DB:", err.message);
        return res.status(500).json({
          success: false,
          message: "Database insertion failed",
          error: err.message
        });
      }

      console.log("Item inserted:", result);
      res.status(200).json({
        success: true,
        message: "Item added successfully",
        data: {
          id: result.insertId,
          itemDescription: inputValue
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database not connected",
      error: error.message
    });
  }
});

// Delete todo item
app.delete('/items/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID"
      });
    }

    checkDbConnection();

    const sql = "DELETE FROM todoItems WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting data from DB:", err.message);
        return res.status(500).json({
          success: false,
          message: "Database deletion failed",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Todo item not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Item deleted successfully"
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database not connected",
      error: error.message
    });
  }
});

// Update todo item
app.put('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { itemDescription } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID"
      });
    }

    if (!itemDescription || itemDescription.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Task description cannot be empty"
      });
    }

    checkDbConnection();

    const sql = "UPDATE todoItems SET itemDescription = ? WHERE id = ?";

    db.query(sql, [itemDescription, id], (err, result) => {
      if (err) {
        console.error("Error updating data in DB:", err.message);
        return res.status(500).json({
          success: false,
          message: "Database update failed",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Todo item not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Item updated successfully"
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database not connected",
      error: error.message
    });
  }
});
