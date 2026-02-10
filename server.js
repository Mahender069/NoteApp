require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/db");
const authRoutes = require("./routes/auth-routes");

const app = express();

//database connection
connectToDatabase();

//middlewares
app.use(express.json());

//routes
app.use("/", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
