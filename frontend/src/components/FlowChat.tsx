import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Handle, Position, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import SourceNode from './nodes/SourceNode';
import { TbBrandTelegram } from 'react-icons/tb';
import TargetNode from './nodes/TargetNode';
import AiAgentNode from './nodes/AiAgentNode';
import { FaRobot } from 'react-icons/fa';

function CustomNode({ data }: any) {
    return (
        <>
            <div className='p-4 bg-zinc-900 text-white border rounded flex gap-2 items-center'>
              <div className='text-lg'><FaRobot /></div>
              <div className='text-sm'>AI Agent</div>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Handle type="source" position={Position.Bottom} style={{left: '20%'}} />
            <Handle type="source" position={Position.Bottom} style={{left: '30%'}} />
            <Handle type="source" position={Position.Bottom} style={{left: '80%'}} />

        </>

    );
}

const nodeTypes = {
    sourceNode: SourceNode,
    targetNode: TargetNode,
    aiAgentnode: AiAgentNode,
    custom: CustomNode,
};

const initialNodes = [
    {
        id: "n1",
        type: "custom",
        position: { x: 0, y: 0 },
        data: { label: "My Custom Node", description: "This is a test" },

    },
    {
        id: "n",
        type: "custom",
        position: { x: 0, y: 200 },
        data: { label: "My Custom Node", description: "This is a test" },

    },
];

// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];



export default function Flow() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );


    const [nodebar, setNodebar] = useState(false)
    const nodebarItems = [
        { title: 'Trigger Manually', nodeId: 'manual', type: 'sourceNode', x:0, y:0 },
        { title: 'Telegram', nodeId: 'telegram', type: 'targetNode', x:100, y:100 },
        { title: 'Email' , nodeId: 'email' },
        { title: 'AI Agent', nodeId: 'aiAgent', type: 'aiAgentnode', x:100, y:0 }
    ]

    const HandleNode = (nodebarItem: any) => {
       setNodes((prev : any) => {
        return [
        ...prev,
        {
            id: nodebarItem.nodeId,
            type: nodebarItem.type,
            position: { x: nodebarItem.x, y: nodebarItem.y }
        }
       ]})
    }

    return (
        <div className='grid grid-cols-4 text-black col-span-3 bg-zinc-900 h-[calc(100%-70px)] w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className={nodebar ? 'col-span-3' : 'col-span-4'}
            >
                <Background gap={10} />
                <Panel position='top-right'>
                    <button onClick={() => setNodebar(!nodebar)} className='border m-4 p-2 cursor-pointer bg-black rounded text-white hover:bg-gray-900'><FiPlus /></button>
                </Panel>
            </ReactFlow>
            <div className={`${nodebar ? 'grid-cols-1' : 'hidden'} bg-black text-white`}>
                <div className='p-4 font-semibold text-xl border-b'>Workflow</div>
                {nodebarItems.map((nodebarItem) => 
                  <div onClick={() => HandleNode(nodebarItem)} className='p-2 pl-4 hover:bg-gray-900 border-b cursor-pointer'>
                    {nodebarItem.title}
                </div>)}
            </div>
        </div>
    );
}
