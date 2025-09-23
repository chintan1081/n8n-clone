import { Handle, Position } from "@xyflow/react"
import { FaRobot } from "react-icons/fa"

const AiAgentNode = () => {
  return (
    <>
      <div className='p-4 bg-zinc-900 text-white border rounded flex gap-2 items-center'>
        <div className='text-lg'><FaRobot /></div>
        <div className='text-sm'>AI Agent</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} style={{ left: '20%' }} />
      <Handle type="source" position={Position.Bottom} style={{ left: '30%' }} />
      <Handle type="source" position={Position.Bottom} style={{ left: '80%' }} />

    </>
  )
}

export default AiAgentNode
