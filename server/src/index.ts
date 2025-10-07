import express from "express";
import "dotenv/config";
import AuthController from "./controllers/auth.controller"
import { connectDb } from "./database/appDataSource";
import WorkflowController from "./controllers/workflow.controller";
import CredentialsController from "./controllers/credentials.controller";
import cors from "cors";
import AuthMiddleware from "./middleware/auth.middleware";
import WebhookController from "./controllers/webhook.controller";
const app = express();

app.use(cors({ origin: "*", credentials: true }))
app.use(express.json());

connectDb();

app.use('/api/auth', AuthController);
app.use('/api/workflow', AuthMiddleware, WorkflowController);
app.use('/api/credential', AuthMiddleware, CredentialsController);
app.use('/api/webhook', WebhookController);


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend running on port : ${process.env.BACKEND_PORT}`);
})