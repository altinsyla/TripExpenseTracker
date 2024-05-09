const express = require('express');
const app = express();
const connectDB = require("./db/connect");


app.use(express.json());

const usersRouter= require("./Routes/users");
app.use('/users',usersRouter)
const tripsRouter= require("./Routes/trips");
app.use('/trips',tripsRouter)
const expenseRouter= require("./Routes/expenses");
app.use('/expenses',expenseRouter)


// Start server
const start = async () => {
    try {
      // console.log("Trying to")
      await connectDB(`mongodb://localhost:27017/TripExpenseTracker`);
      console.log("Connected to DB");
      app.listen(port, console.log(`Server is listening on port ${port}`));
      app.listen(3000, "0.0.0.0", () => {
        console.log(`Server is listening on port 3000`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  start();