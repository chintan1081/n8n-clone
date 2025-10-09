import { Router } from "express";
import { AppDataSource } from "../database/appDataSource";
import { Webhook } from "../entities/webhook.entity";
import { Workflow } from "../entities/workflow.entity";
import jwt from "jsonwebtoken";
import { error } from "console";
import { executeWorkflow } from "../services/executeWorkflow.service";
import AuthMiddleware from "../middleware/auth.middleware";
import { In } from "typeorm";
import { success } from "zod";

const router = Router();

const webhookRepository = AppDataSource.getRepository(Webhook);
const workflowRepository = AppDataSource.getRepository(Workflow);

router.post("/", AuthMiddleware, async (req, res) => {
    const { title, method, header, secret, workflowId } = req.body;
    const workflow = await workflowRepository.findOne({ where: { id: workflowId } });
    if (!workflow)
        return res.status(411).json({
            data: null,
            message: null,
            error: "workflow doesn't found"
        });

    let token;
    if (header !== "none") {
        token = jwt.sign({
            workflowId
        }, secret, { expiresIn: '100y' })
    }

    const webhook = webhookRepository.create({
        title,
        method,
        header: token ? token : header,
        secret,
        workflow
    })

    await webhookRepository.save(webhook);
    webhookRepository.merge(webhook, {
        path: `/webhook/${webhook.id}`
    });
    await webhookRepository.save(webhook);
    res.status(200).json({
        data: webhook,
        message: "webhook created successfully",
        error: null
    })

})

router.get("/", AuthMiddleware, async (req, res) => {
    try {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID missing in request",
                error: "Invalid token or missing user data",
                data: null,
            });
        }

        const webhooks = await webhookRepository.find({
            where: {
                workflow: { user: { id: userId } }
            },
            relations: ["workflow", "workflow.user"],
        });
        
        return res.status(200).json({
            message: "Webhooks fetched successfully",
            data: webhooks,
            error: null,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err instanceof Error ? err.message : err,
            data: null,
        });
    }
})

router.get("/:webhookId", async (req, res) => {
    const { webhookId } = req.params;
    const webhook = await webhookRepository.findOne({
        where: {
            id: webhookId
        },
        relations: ["workflow", "workflow.user"]
    });

    if(!webhook?.workflow.enable){
        throw new Error("Workflow is not enable yet")
    }

    if (!webhook) {
        return res.status(404).json({
            error: "webhook doesn't found"
        })
    }
      if (webhook.method !== "get") {
        return res.status(404).json({
            error: "provide correct method"
        })
    }

    const workflowId = webhook?.workflow.id
    const userId = webhook?.workflow.user.id;

    if (webhook.header !== "none") {
        const authHeader = req.headers["authorization"];
        const token = authHeader?.split(" ")[1];
        if (!token)
            return res.status(401).json({
                error: "token doesn't exist"
            });


        try {
            const decoded = jwt.verify(token, webhook.secret);
        } catch (err) {
            return res.status(401).json({
                error: "Invalid or expired token"
            });
        }
        const executed = await executeWorkflow(workflowId, userId);
        res.status(200).json({
            message: "execution state successfully"
        })
    } else {
        const executed = await executeWorkflow(workflowId, userId)
        res.status(200).json({
            message: "execution state successfully"
        })
    }
});


router.post("/:webhookId", async (req, res) => {
    const webhookId = (req as any).webhookId;
    const webhook = await webhookRepository.findOne({
        where: {
            id: webhookId
        },
        relations: ["workflow", "workflow.user"]
    });
    if (!webhook) {
        return res.status(404).json({
            error: "webhook doesn't found"
        })
    }
    if (webhook.method !== "post") {
        return res.status(404).json({
            error: "provide correct method"
        })
    }
    const workflowId = webhook?.workflow.id;
    const userId = webhook?.workflow.user.id;

    if (webhook.header !== "none") {
        const authHeader = req.headers["authorization"];
        const token = authHeader?.split(" ")[1];
        if (!token)
            return res.status(401).json({
                error: "token doesn't exist"
            });

        const verify = jwt.verify(webhook.header, webhook.secret);
        if (!verify) {
            return res.status(401).json({
                error: "invalid authentication"
            });
        }
        const executed = await executeWorkflow(workflowId, userId);
        res.status(200).json({
            message: "execution state successfully"
        })
    } else {
        const executed = await executeWorkflow(workflowId, userId)
        res.status(200).json({
            message: "execution state successfully"
        })
    }
});

router.delete('/:workflowId', async(req, res) => {
    const { workflowId } = req.params;
    await webhookRepository.delete({ workflow: {id: workflowId }});
    res.status(200).json({
        success: true,
        message: "webhook deleted successfully",
        data: null
    })
})

export default router;