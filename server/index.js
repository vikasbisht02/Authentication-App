const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const  connectDB  = require("./db/connectDB.js");

const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "https://authentication-app-eight-jet.vercel.app"],
  credentials: true,
}));


app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});

