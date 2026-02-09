const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

// Route the root URL to your index.html
app.get('/', (req, res) => {
  res.sendFile('public', 'index.html');
});

app.use("/users", require("./src/routes/userRoutes"));
app.use("/expenses", require("./src/routes/expenseRoutes"));
app.use("/incomes", require("./src/routes/incomeRoutes"));

module.exports = app;