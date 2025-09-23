import { Handle, Position } from "@xyflow/react"
import { BiPointer } from "react-icons/bi"

const SourceNode = () => {
    return (
        <>
            <div className='p-4 bg-zinc-900 text-white border rounded-l-full'>
                <div className='text-lg'><BiPointer /></div>
            </div>
            <Handle type="source"
                position={Position.Right}
                isConnectableStart={true} />
        </>
    )
}

export default SourceNode
