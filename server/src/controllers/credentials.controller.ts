import { Router } from "express";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const router = Router();
const credentialsRepo = AppDataSource.getRepository(Credentials);

router.post("/", async (req, res) => {
    const { title, platform, data } = req.body;
    if (!title && !platform && !data) {
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

router.get("/", async (req, res) => {
    const credentials = await credentialsRepo.find();
    return res.status(200).json(credentials)
})


router.put("/:id", async (req, res) => {
    const { title, platform, data } = req.body;
    const { id } = req.params;
    const credential = await credentialsRepo.findOne({ where: { id } })

    if (!credential) {
        return res.status(404).json({ error: "Workflow not found" })
    }

    credentialsRepo.merge(credential, {
        data,
        platform,
        title
    })

    const updatedcredential = await credentialsRepo.save(credential);
    return res.status(200).json(updatedcredential);

})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Missing query params"
        })
    }

    const credential = await credentialsRepo.findOne({
        where: {
            id: String(id)
        }
    })
    console.log(credential, '.....');

    if (!credential) {
        return res.status(404).json({ error: "Workflow not found" });
    }
    res.status(200).json(credential)
})


export default router;