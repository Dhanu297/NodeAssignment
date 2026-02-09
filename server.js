// Import the instance of app from app.js
const app = require("./app");

// Import dotenv so we can load environment variables from a .env file
const dotenv = require("dotenv");

// Load all variables defined in the .env file into process.env
dotenv.config();

// Start the server and listen on the port defined in the environment variables.
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
