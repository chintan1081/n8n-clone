
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const tools: any = {
    gemini: <RiGeminiFill />,
    sum: <IoMdAdd />,
    multiply: <IoMdClose />
}

const ToolsNode = ({ data }: any) => {
     const connectionsTarget = useNodeConnections({
                    handleType: "target",
                });

    return (
        <div className="relative group">
            <div onClick={() => data.onDelete(data.id)} className="absolute p-1 cursor-pointer hover:text-orange-600 -right-1 -top-4 bg-zinc-900 text-[8px] hidden group-hover:block text-white rounded">
                <FiTrash2 />
            </div>
            <div className='p-4 rounded-full bg-zinc-900 text-white border flex gap-2 items-center'>
                <div className='text-lg'>{tools[data.id]}</div>
            </div>
            <Handle type="target" 
                    position={Position.Top}
                    isConnectable={connectionsTarget.length < 1}
            />
        </div>
    )
}

export default ToolsNode
