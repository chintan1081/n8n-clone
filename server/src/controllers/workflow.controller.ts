import { AppDataSource } from "../database/appDataSource"
import { Router } from "express";
import { Workflow } from "../entities/workflow.entity";
import { executeWorkflow } from "../services/executeWorkflow.service";

const router = Router()

const workflowRepository = AppDataSource.getRepository(Workflow);

router.post("/", async (req, res) => {
    const { title, nodes, edges } = req.body;
    const workflow = workflowRepository.create({
        title,
        nodes,
        edges
    })

    await workflowRepository.save(workflow);
    res.status(200).json({
        message: "workflow saved successfully",
        data: workflow
    })
})

router.get("/", async (req, res) => {
    const workflows = await workflowRepository.find();
    return res.status(200).json(workflows)
})

router.put("/:id", async (req, res) => {
    const { nodes, edges, title } = req.body;
    const { id } = req.params;
    const workflow = await workflowRepository.findOne({ where : { id }})

    if(!workflow) {
        return res.status(404).json({ error: "Workflow not found" })
    }
    
    workflowRepository.merge(workflow, {
        nodes,
        edges,
        title
    })
    
    const updatedWorkflow = await workflowRepository.save(workflow);
  return res.status(200).json(updatedWorkflow);

})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Missing query params"
        })
    }

    const workflow = await workflowRepository.findOne({
        where: {
            id: String(id)
        }
    })
    console.log(workflow,'.....');
    
    if (!workflow) {
        return res.status(404).json({ error: "Workflow not found" });
    }
    res.status(200).json(workflow)
})

router.get('/execute/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Missing query params"
        })
    }

   try {
    const executed = await executeWorkflow(id)
    res.status(200).json({
        message: "workflow executed"
    })
   }
   catch(error){
    res.status(404).json({
        error
    })
   }
    

})

export default router;