// Import the Express framework to create the application instance
const express = require("express");

// Initialize the Express application
const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Serve all static files (HTML, CSS, JS, images) from the "public" folder.
app.use(express.static("public"));

// Route the root URL to your index.html
app.get('/', (req, res) => {
  res.sendFile('public', 'index.html');
});

// Mount the API routes under routes folders
app.use("/users", require("./src/routes/userRoutes"));
app.use("/expenses", require("./src/routes/expenseRoutes"));
app.use("/incomes", require("./src/routes/incomeRoutes"));

// Export the Express app 
module.exports = app;