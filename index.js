const express = require('express');
const app = express();
const connectDB = require("./db/connect");

const port = 3000; // Define the port

app.use(express.json());

const usersRouter = require("./Routes/users");
app.use('/users', usersRouter);
const tripsRouter = require("./Routes/trips");
app.use('/trips', tripsRouter);
const expenseRouter = require("./Routes/expenses");
app.use('/expenses', expenseRouter);
const userRoleRouter = require('./Routes/userRole');
app.use('/userRole', userRoleRouter);
const expenseTypeRouter = require('./Routes/expenseType');
app.use('./expenseType', expenseTypeRouter);

// MongoDB connection string
const mongoURI = 'mongodb+srv://altinsyla:altinsyla123@tripexpensetracker.3ttydnv.mongodb.net/?retryWrites=true&w=majority&appName=TripExpenseTracker';

// Start server
const start = async () => {
  try {
    await connectDB(mongoURI);
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    }).on('error', (err) => {
      console.error('Server error:', err.message);
    });
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};

start();
