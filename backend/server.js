require("dotenv").config();
const express = require("express");
const cookieParser=require('cookie-parser');
const connectToDatabase = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const noteRoutes = require("./routes/note-routes");
const cors=require('cors')

const app = express();

//enable cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//database connection
connectToDatabase();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", authRoutes);
app.use("/", noteRoutes);



const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });

module.exports=app
