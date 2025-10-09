import { Router } from "express";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";
import { User } from "../entities/user.entity";

const router = Router();
const credentialsRepo = AppDataSource.getRepository(Credentials);
const userRepository = AppDataSource.getRepository(User);

router.post("/", async (req, res) => {
    const userId = (req as any).userId;
    const user = await userRepository.findOne({ where: { id: userId }});
    
    if(!user)
        return res.status(411).json({
            message: null,
            data: null,
            error: "user not found"
    });

    const { title, platform, data } = req.body;
    if (!title && !platform && !data) {
        res.status(400).json({
            message: "Missing query parameters"
        })
    }

    const credentials = credentialsRepo.create({
        title: String(title),
        platform: String(platform),
        data,
        user
    })
    await credentialsRepo.save(credentials);
    res.status(200).json(credentials);
})

router.get("/", async (req, res) => {
    const userId = (req as any).userId;
    const credentials = await credentialsRepo.find({ where: { user: { id: userId }}});
    return res.status(200).json(credentials)
})


router.put("/:id", async (req, res) => {
    const userId = (req as any).userId;
    const { title, platform, data } = req.body;
    const { id } = req.params;
    const credential = await credentialsRepo.findOne({ where: { id, user: { id: userId }}});

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
    const userId = (req as any).userId;
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Missing query params"
        })
    }

    const credential = await credentialsRepo.findOne({
        where: {
            id: String(id),
            user: { id: userId }
        },
        order: { createdAt: 'DESC' }
    })
    if (!credential) {
        return res.status(404).json({ error: "Workflow not found" });
    }
    res.status(200).json(credential)
})


export default router;