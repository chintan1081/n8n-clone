import { Handle, Position, useNodeConnections } from "@xyflow/react"
import { FaRobot } from "react-icons/fa"
import { FiTrash2 } from "react-icons/fi"

const AiAgentNode = ({ data }: any) => {
        const connectionsSource = useNodeConnections({
            handleType: "source",
        });

        const connectionsTarget = useNodeConnections({
            handleType: "target",
        });
        

  return (
    <div className="relative group">
      <div onClick={() => data.onDelete(data.id)} className="absolute p-1 cursor-pointer hover:text-orange-600 -right-1 -top-4 bg-zinc-900 text-[8px] hidden group-hover:block text-white rounded">
        <FiTrash2 />
      </div>
      <div className='p-4 bg-zinc-900 text-white border rounded flex gap-2 items-center'>
        <div className='text-lg'><FaRobot /></div>
        <div className='text-sm'>AI Agent</div>
      </div>
      <Handle type="target" 
              position={Position.Left} 
              id="target-1"
              isConnectable={connectionsTarget.length < 1}
      />
      <Handle type="source"
              position={Position.Right}
              id="source-right"
       />
      <Handle type="source"
              position={Position.Bottom}
              id="source-bottom-1"
              style={{ left: '20%' }}
      />
      {/* <Handle type="source" position={Position.Bottom} id="source-bottom-2" style={{ left: '30%' }} /> */}
      <Handle type="source"
              position={Position.Bottom}
              id="source-bottom-3"
      />
    </div>
  )
}

export default AiAgentNode
