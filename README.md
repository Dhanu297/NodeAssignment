##This is API developed for personal finance
Tools used:  Node.js + Express with Google Firestore as the database.

Table of Contents
- Overview
- Features
- Project Structure
- Prerequisites
- Installation
- Environment Variables
- Running the Application
- API Endpoints
- Schemas
- Dependencies

Overview
    This backend provides RESTful APIs to manage:

    Users
        Stores personal details such as name, username, email, and address.
    Income
        Tracks different income sources like wages, secondary income, interest, support payments, and others.
    Expenses
        Stores detailed expense categories including savings, payment obligations, insurance, housing, utilities, and personal expenses.
The API follows a clean MVC structure with separate controllers, routes, and validation middleware.

Features
- Modular MVC architecture
- Firestore database integration
- validation 
- JSON responses
- Timestamp tracking (createdAt, updatedAt)
- Easy to extend for dashboards, analytics, and reporting

Project Structure

src/
    controllers/
        userController.js
        incomeController.js
        expenseController.js
    middleware/
        validateUser.js
        validateIncome.js
        validateExpense.js
    routes/
        userRoutes.js
        incomeRoutes.js
        expenseRoutes.js
    configuration/
        firebase.js
    utils/
        errorHandler.js
server.js
app.js

Prerequisites
Before running the project, ensure you have:
- Node.js (v16 or higher recommended)
- npm 
- A Firebase project with Firestore enabled
- Firebase Admin SDK credentials (service account JSON)
    To get the service account json file go to your firebase console. Project settings - there is a dropdown menu called service account. Then there are 4 options to chose which technology. Select node js and generate new private key. copy that file  into configuration folder with name FireBaseAdminConfig.json

Installation
1. Clone the repository
git clone (https://github.com/Dhanu297/NodeAssignment.git)
cd <project-folder>


2. Install dependencies
npm install -
express
firebase-admin
crypto
dotenv

Environment Variables
This project is using encryption so go to terminal and traverse to src-> configuration folder and run command 

\src\configuration> node encrypt.js
carefully copy Encrypted Credentials, key and IV

Create a .env file in the root directory and add the following: 
FIREBASE_ENCRYPTED=your newly generated Credentials
FIREBASE_KEY=your newly generated key
FIREBASE_IV=your newly generated IV
PORT=5000 you can change it to available port


⚠ Important Notes
- carefully copy Encrypted Credentials, key and IV into .env file without any quotes or spaces


▶ Running the Application
Start the server
npm start


The server will run at:
http://localhost:5000 or the port which you mentioned in the .env file.



API Endpoints
    User Routes
        get/users  - get all users
        get/users/:id - get user by id
        post/users - add/post user data 
        put/users/:id -update user with specidied id
        delete /users/:id -delete user with specidied id

    Income Routes
        get/incomes  - get all incomes
        get/incomes/:id - get incomes by id
        post/incomes - add/post incomes data 
        put/incomes/:id -update incomes with specidied id
        delete /incomes/:id -delete incomes with specidied id

    Expense Routes
        get/expenses  - get all expenses
        get/expenses/:id - get expenses by id
        post/expenses - add/post expenses data 
        put/expenses/:id -update expenses with specidied id
        delete/expenses/:id -delete expenses with specidied id

Sample User object
{
  "name": "Leanne Graham",
  "username": "leanne_g",
  "email": "leanne@example.com",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}


Income Schema
{
  "userid": "ref-to-user",
  "wages": 5000,
  "secondaryIncome": 1200,
  "interest": 150,
  "supportPayment": 300,
  "others": 200,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}


Expense Schema
{
  "userid": "ref-to-user",
  "savings": {
    "emergencySavings": 4000,
    "longTermSavings": 15000,
    "retirement": 8000,
    "other": 1000
  },
  "paymentObligations": {
    "creditCards": 1000,
    "loan": 2000,
    "studentLoans": 2000,
    "linesOfCredit": 12000
  },
  "insurance": {
    "lifeInsurance": 400,
    "healthInsurance": 600,
    "other": 300
  },
  "housing": {
    "rent": 1000,
    "rentInsurance": 200,
    "mortgage": 1500,
    "utilities": 300,
    "maintenance": 300
  },
  "utilities": {
    "phone": 200,
    "internet": 500,
    "water": 100,
    "electricity": 400,
    "cable": 150
  },
  "personal": {
    "transportation": 500,
    "clothing": 60,
    "gifts": 60,
    "grooming": 100,
    "diningOut": 100,
    "hobbies": 200,
    "others": 100
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

Dependencies
This project uses the following core dependencies:
express
firebase-admin
dotenv
corscrypto
nodemon (dev)

Install them via:
npm install



