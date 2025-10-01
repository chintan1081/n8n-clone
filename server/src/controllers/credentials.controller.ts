import { Router } from "express";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const router = Router();
const credentialsRepo = AppDataSource.getRepository(Credentials);

router.post("/", async(req, res) => {
    const { title, platform , data } = req.body;
    if(!title && !platform && !data){
        res.status(400).json({
            message: "Missing query parameters"
        })
    }
    const credentials = credentialsRepo.create({
        title: String(title),
        platform: String(platform),
        data
    })
   await credentialsRepo.save(credentials);
   res.status(200).json(credentials);
})