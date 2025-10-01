    import { Handle, Position, useNodeConnections } from "@xyflow/react"
    import { BiPointer } from "react-icons/bi"
    import { FiTrash2 } from "react-icons/fi";

    const SourceNode = ({ data } : any) => {
        const connections = useNodeConnections({
            handleType: "source",
        });

        return (
            <div className="relative group">
                <div onClick={() => data.onDelete(data.id)} className="absolute p-1 cursor-pointer hover:text-orange-600 -right-1 -top-4 bg-zinc-900 text-[8px] hidden group-hover:block text-white rounded">
                    <FiTrash2 />
                </div>
                <div className='p-4 bg-zinc-900 text-white border rounded-l-full text-lg'>
                    <BiPointer />
                </div>
                <Handle type="source"
                    position={Position.Right}
                    isConnectableStart={true}
                    isConnectable={connections.length < 2}
                />
            </div>
        )
}

export default SourceNode
