import express from "express";
import "dotenv/config";
import Auth from "./controllers/auth.controller"
import { connectDb } from "./database/appDataSource";
import cors from "cors";
const app = express();

app.use(cors({ origin: "*", credentials: true }))
app.use(express.json());

connectDb();

app.use('/api/auth', Auth);


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend running on port : ${process.env.BACKEND_PORT}`);
})