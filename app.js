const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Simple REST API",
    endpoints: {
      users: "/users",
      expenses: "/expenses",
      income: "/incomes"
    }
  });
});

app.use("/users", require("./src/routes/userRoutes"));
app.use("/expenses", require("./src/routes/expenseRoutes"));
app.use("/incomes", require("./src/routes/incomeRoutes"));

module.exports = app;