import { AppDataSource } from "../database/appDataSource";
import { Workflow } from "../entities/workflow.entity";
import { aiAgentService } from "./aiAgent.service";
import { emailService } from "./email.service";
import { telegramService } from "./telegram.service";

const workflowRepo = AppDataSource.getRepository(Workflow);
const services: any = {
    'aiAgent': aiAgentService,
    'telegram': telegramService,
    'email': emailService
}
export async function executeWorkflow(workflowId: string) {
    const workflow = await workflowRepo.findOne({ where: { id: workflowId } });
    console.log(workflow?.nodes, workflow?.edges, '...................');
    if (!workflow) throw Error("error finding workflow")
    let result: any = null;
    let edges: any = workflow?.edges;

    for (const edge of edges) {
        const currentTarget = edge.target;
        const service = services[currentTarget]
        result = await service(result)
    }

}