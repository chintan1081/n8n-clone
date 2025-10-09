import { Router } from "express";
import { AppDataSource } from "../database/appDataSource";
import { Cron } from "../entities/cron.entity";
import { Workflow } from "../entities/workflow.entity";
import cronService from "../services/cron.service";
import AuthMiddleware from "../middleware/auth.middleware";

const router = Router();

const cornRepository = AppDataSource.getRepository(Cron);
const workflowRepository = AppDataSource.getRepository(Workflow);

router.post("/", AuthMiddleware, async (req, res) => {
    const userId = (req as any).userId;
    const { title, data, workflowId } = req.body;
    const workflow = await workflowRepository.findOne({ where: { id: workflowId } });
    if (!workflow)
        return res.status(404).json({
            success: false,
            message: "workflow didn't found",
            data: null
        })
    const cronData = cornRepository.create({
        title,
        data,
        workflow
    })
    await cornRepository.save(cronData);
    try {
        cronService(cronData, workflowId, userId)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : error,
            data: null,
        });
    }
    res.status(201).json({
        data: cronData,
        message: "cron created successfully",
        success: true
    })

})

router.get("/", AuthMiddleware, async (req, res) => {
    const userId = (req as any).userId;
    const cron = await cornRepository.find({
        where: {
            workflow: {
                user: {
                    id: userId
                }
            }
        },
        relations: ["workflow", "workflow.user"],
        order: { createdAt: "DESC" }
    })

    res.status(200).json({
        success: true,
        data: cron,
        message: "found all corn data"
    })
})

router.delete('/:workflowId', async(req, res) => {
    const { workflowId } = req.params;
    await cornRepository.delete({ workflow: {id: workflowId }});
    res.status(200).json({
        success: true,
        message: "cron deleted successfully",
        data: null
    })
})

export default router;