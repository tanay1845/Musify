import express from "express"
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/User.route.js"

dotenv.config({})

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/user",userRouter);

app.listen(PORT, () => {
    console.log(`App running at Port Number ${PORT}`)
})