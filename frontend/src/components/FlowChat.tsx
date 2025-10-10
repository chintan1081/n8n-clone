import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Panel, type Edge, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import SourceNode from './nodes/SourceNode';
import TargetNode from './nodes/TargetNode';
import AiAgentNode from './nodes/AiAgentNode';
import { Delete, Get, Post, Put } from '@/assets/axios';
import { useNavigate, useParams } from 'react-router-dom';
import ToolsNode from './nodes/toolsNode';
import LlmNode from './nodes/llmNode';
import { toast } from 'react-toastify';
import WebhookForm from './WebhookForm';
import CronForm from './CronForm';

// function CustomNode({ data }: any) {
//     return (
//         <>
//             <div className='p-4 rounded-full bg-zinc-900 text-white border flex gap-2 items-center'>
//                 <div className='text-lg'><FaRobot /></div>
//             </div>
//             <Handle type="target" position={Position.Top} />
//         </>

//     );
// }

const nodeTypes = {
    sourceNode: SourceNode,
    targetNode: TargetNode,
    aiAgentnode: AiAgentNode,
    // custom: CustomNode,
    toolsNode: ToolsNode,
    llmNode: LlmNode
};

// const initialNodes = [
//     {
//         id: "n1",
//         type: "custom",
//         position: { x: 0, y: 0 },
//         data: { label: "My Custom Node", description: "This is a test" },

//     },
//     {
//         id: "n",
//         type: "custom",
//         position: { x: 0, y: 200 },
//         data: { label: "My Custom Node", description: "This is a test" },

//     },
// ];

// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function FlowChart() {
    const { id: workflowId } = useParams();
    const navigate = useNavigate();
    const [nodes, setNodes] = useState<any>([]);
    const [edges, setEdges] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [isWebhookOpen, setIsWebhookOpen] = useState(false);
    const [isCronOpen, setIsCronOpen] = useState(false);

    useEffect(() => {
        Get(`/api/workflow/${workflowId}`).then((response) => {
            const data = response.data;
            const nodesWithDelete = data.nodes.map((node: any) => ({
                ...node,
                data: {
                    ...node.data,
                    onDelete: HandleDeleteNode
                }
            }))
            setNodes(nodesWithDelete);
            setEdges(data.edges);
            setTitle(data.title);
        }).catch((error) => {
            console.log(error);
            
        })
    }, [workflowId])

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot: any) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
        [],
    );


    const [nodebar, setNodebar] = useState(false)
    const nodebarItems = [
        { title: 'Trigger Manually', nodeId: 'manual', type: 'sourceNode', x: 0, y: 0 },
        { title: 'Webhook', nodeId: 'webhook', type: 'sourceNode', x: 0, y: 0 },
        { title: 'Cron', nodeId: 'cron', type: 'sourceNode', x: 0, y: 0 },
        { title: 'Telegram', nodeId: 'telegram', type: 'targetNode', x: 100, y: 100 },
        { title: 'Email', nodeId: 'email', type: 'targetNode', x: 50, y: 100 },
        { title: 'AI Agent', nodeId: 'aiAgent', type: 'aiAgentnode', x: 100, y: 0 },
        { title: 'Gemini Ai', nodeId: 'gemini', type: 'llmNode', x: 150, y: 0 },
        { title: 'Multiply Tool', nodeId: 'multiply', type: 'toolsNode', x: 150, y: 50 },
        { title: 'Addition Tool', nodeId: 'sum', type: 'toolsNode', x: 150, y: 100 },

    ]

    const HandleNode = (nodebarItem: any) => {
        if (nodebarItem.nodeId === "manual") {

        }
        else if (nodebarItem.nodeId === "cron") {
            setIsCronOpen(true);
        }
        else if (nodebarItem.nodeId === "webhook") {
            setIsWebhookOpen(true);
        }

        if (nodebarItem.type === "sourceNode") {
            const node = nodes.filter((node: any) => node.type !== "sourceNode")
            setNodes([...node, {
                id: nodebarItem.nodeId,
                type: nodebarItem.type,
                position: { x: nodebarItem.x, y: nodebarItem.y },
                data: { id: nodebarItem.nodeId, onDelete: HandleDeleteNode, ...nodebarItem.data }
            }])
        }
        else {
            setNodes((prev: any) => {
                return [
                    ...prev,
                    {
                        id: nodebarItem.nodeId,
                        type: nodebarItem.type,
                        position: { x: nodebarItem.x, y: nodebarItem.y },
                        data: { id: nodebarItem.nodeId, onDelete: HandleDeleteNode, ...nodebarItem.data }
                    }
                ]
            });
        }
    }

    const SubmitWorkflow = async () => {
        if (!title) {
            toast.error("Title required for workflow!");
            return
        }
        const response = await Post("/api/workflow", {
            nodes,
            edges,
            title
        });
        navigate(`${location.pathname}/${response.data.data.id}`);
        toast.success(response.data.message)
    }

    const UpdateWorkflow = async () => {
        if (!title) {
            toast.error("Title required for workflow!");
            return
        }
        const response = await Put(`/api/workflow/${workflowId}`, {
            nodes,
            edges,
            title
        })
        toast.success(response.data.message)
        navigate(location.pathname);
    }



    const HandleDeleteNode = async (id: string) => {
        setNodes((prev: any) => {
            const node = prev.filter((node: any) => node.id !== id)
            return node;
        })
        setEdges((prev: any) => {
            return prev.filter((edge: any) => edge.source !== id && edge.target !== id)
        });

        if(id === 'webhook' ){
            await Delete(`/api/webhook/${workflowId}`)
        }else if(id === 'cron'){
            await Delete(`/api/cron/${workflowId}`)
        }
    }

    const HandleDeleteEdge = (currentEdge: any, event: any) => {
        event
        setEdges((prev: any) => {
            return prev.filter((edge: any) => edge.id !== currentEdge.id)
        })
    }

    const HandleNodesExecution = async () => {
        try {
            await Get(`/api/workflow/execute/${workflowId}`)
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='grid grid-cols-4 text-black col-span-3 bg-zinc-900 h-full w-full relative'>
            <div className='absolute bg-black text-white p-2 z-1 rounded'>
                <label className="text-sm mr-2">Title:</label>
                <input onChange={(e) => setTitle(e.target.value)} defaultValue={title} className='border-0 outline-none border-b w-24' placeholder="enter title" type="text" />
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onEdgeClick={(event, edge) => HandleDeleteEdge(edge, event)}
                onConnect={onConnect}
                fitView
                className={nodebar ? 'col-span-3' : 'col-span-4'}
            >
                <Background gap={10} />
                <Panel position='top-right'>
                    <button onClick={() => setNodebar(!nodebar)} className='border m-4 p-2 cursor-pointer bg-black rounded text-white hover:bg-gray-900'>
                        {!nodebar ? <FiPlus /> : <FiMinus />}
                    </button>
                </Panel>
            </ReactFlow>
            <div className={`${nodebar ? 'grid-cols-1' : 'hidden'} bg-black text-white relative`}>
                <div className='p-4 font-semibold text-xl border-b'>Workflow</div>
                {nodebarItems.map((nodebarItem, index) =>
                    <div key={index} onClick={() => HandleNode(nodebarItem)} className='p-2 pl-4 hover:bg-gray-900 border-b cursor-pointer'>
                        {nodebarItem.title}
                    </div>)}
                <div className='absolute bottom-0  text-center border-t w-full'>
                    <div onClick={workflowId ? UpdateWorkflow : SubmitWorkflow} className='p-2 cursor-pointer rounded hover:bg-gray-900'>save</div>
                    <div onClick={HandleNodesExecution} className='p-2 cursor-pointer rounded  hover:bg-gray-900'>Execute</div>
                </div>
            </div>
            {(isWebhookOpen || isCronOpen) && <div className='z-1 absolute w-full bg-zinc-900/50 h-full'>
                <div className='max-w-3xl mx-auto'>
                    {isWebhookOpen && <WebhookForm setIsWebhookOpen={setIsWebhookOpen} />}
                    {isCronOpen && <CronForm setIsCronOpen={setIsCronOpen} />}
                </div>
            </div>}
        </div>
    );
}
