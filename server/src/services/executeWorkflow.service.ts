import { AppDataSource } from "../database/appDataSource";
import { User } from "../entities/user.entity";
import { Workflow } from "../entities/workflow.entity";
import { aiAgentService } from "./aiAgent.service";
import { emailService } from "./email.service";
import { telegramService } from "./telegram.service";

const workflowRepo = AppDataSource.getRepository(Workflow);
const services: any = {
    'aiAgent': aiAgentService,
    'telegram': telegramService,
    'email': emailService,
}
export async function executeWorkflow(workflowId: string, userId: string) {
    const workflow = await workflowRepo.findOne({ where: { id: workflowId, user: { id: userId } } });
    if (!workflow) throw Error("error finding workflow")
    let result: any = null;
    let nodes: any = workflow?.nodes;
    let edges: any = workflow?.edges;
    const tools = [];
    let exectionSeqs: any = [];
    let llmNode;
    let targetNode: any = [];

    for (const node of nodes) {
        if (node.type == 'toolsNode')
            tools.push(node.id);
        else if (node.type !== 'sourceNode' && node.type !== 'toolsNode' && node.type !== 'llmNode' && node.type !== 'targetNode')
            exectionSeqs.push(node.id)
        else if (node.type == 'llmNode')
            llmNode = node.id;
        else if (node.type === 'targetNode') {
            targetNode.push(node.id);
        }
    }
    exectionSeqs = [...exectionSeqs, ...targetNode]
    // const sourceNode = nodes.find((node: any) => node.type === "sourceNode");
    // const nodess = nodes.map((node: any) => node.id);

    // const removeNodes = [...tools, llmNode];
    // let newEdges = [];
    // for(const edge of edges){
    //     for(const node of nodess){
            
    //     }
    // }

    // console.log(sourceNode,nodes, edges, '..........');
    for (const exectionSeq of exectionSeqs) {
            if (exectionSeq === 'aiAgent') {
                result = await aiAgentService(userId, llmNode, tools)
            } else {
                const service = services[exectionSeq];
                await service(userId, result);
            }
    }

}