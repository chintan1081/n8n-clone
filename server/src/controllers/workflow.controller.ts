import { AppDataSource } from "../database/appDataSource"
import { Router } from "express";
import { Workflow } from "../entities/workflow.entity";
import { executeWorkflow } from "../services/executeWorkflow.service";
import { User } from "../entities/user.entity";

const router = Router()

const workflowRepository = AppDataSource.getRepository(Workflow);
const userRepository = AppDataSource.getRepository(User);


router.post("/", async (req, res) => {
    const { title, nodes, edges } = req.body;
    const userId = (req as any).userId;
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user)
        return res.status(411).json({ data: null, error: "user not found" })
    const workflow = workflowRepository.create({
        title: title ? title : `workflow-${Date.now()}`,
        nodes,
        edges,
        user
    })

    await workflowRepository.save(workflow);
    res.status(200).json({
        message: "workflow saved successfully",
        data: workflow,
        error: null
    })
})

router.get("/", async (req, res) => {
    const userId = (req as any).userId;
    const workflows = await workflowRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: ["cron", "webhook"],
        order: { createdAt: 'DESC' }
    });
    return res.status(200).json(workflows)
})

router.put("/:id", async (req, res) => {
    const { nodes, edges, title } = req.body;
    const { id } = req.params;

    const userId = (req as any).userId;

    const workflow = await workflowRepository.findOne({ where: { id, user: { id: userId } } })
    if (!workflow) {
        return res.status(404).json({ error: "Workflow not found" })
    }

    workflowRepository.merge(workflow, {
        ...req.body
    })

    const updatedWorkflow = await workflowRepository.save(workflow);
    return res.status(200).json({
        data: updatedWorkflow,
        message: "workflow updated successfully!",
        error: null
    });

})

router.get('/:id', async (req, res) => {
    const userId = (req as any).userId;

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Missing query params"
        })
    }

    const workflow = await workflowRepository.findOne({
        where: {
            id: String(id),
            user: { id: userId }
        }
    })
    if (!workflow) {
        return res.status(404).json({ error: "Workflow not found" });
    }
    res.status(200).json(workflow)
})

router.get('/execute/:id', async (req, res) => {
    const userId = (req as any).userId;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({
                message: "Missing query params"
            })
        }
        const workflow = await workflowRepository.findOne({
            where: {
                id
            },
        });
        if (!workflow) {
            throw new Error("Worflow doesn't exist")
        }
        if (!workflow.enable) {
            throw new Error("Workflow is not enable yet")
        }
        const executed = await executeWorkflow(id, userId)
        res.status(200).json({
            message: "workflow executed"
        })
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
})

export default router;