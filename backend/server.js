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
  origin: "https://note-app-frontend-isur2vgan-tnmahender-8366s-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
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
app.get("/", (req, res) => {
  res.status(200).send("Backend is running ✅");
});

module.exports=app
