
const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect DB
connectDB();

app.get('/',(req,res) => res.send("API Running"));

// Define Routes
app.use('/api/users', require("./routes/api/users"))



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));