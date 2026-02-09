const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/users", require("./src/routes/userRoutes"));
app.use("/expenses", require("./src/routes/expenseRoutes"));
app.use("/incomes", require("./src/routes/incomeRoutes"));

module.exports = app;