import express from "express";
import "dotenv/config";
import Auth from "./controllers/auth.controller"
import { connectDb } from "./database/appDataSource";
import Workflow from "./controllers/workflow.controller";
import cors from "cors";
const app = express();

app.use(cors({ origin: "*", credentials: true }))
app.use(express.json());

connectDb();

app.use('/api/auth', Auth);

app.use('/api/workflow', Workflow);


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend running on port : ${process.env.BACKEND_PORT}`);
})