    import { Handle, Position, useNodeConnections } from "@xyflow/react";
    import { MdOutlineWebhook } from "react-icons/md";
    import { BiPointer } from "react-icons/bi";
    import { FiTrash2 } from "react-icons/fi";
    import { MdAlarmOn } from "react-icons/md";

    const SourceNode = ({ data } : any) => {
        const connections = useNodeConnections({
            handleType: "source",
        });

        const logo: any = {
            manual: <BiPointer />,
            webhook: <MdOutlineWebhook />,
            cron: <MdAlarmOn />
        }

        return (
            <div className="relative group">
                <div onClick={() => data.onDelete(data.id)} className="absolute p-1 cursor-pointer hover:text-orange-600 -right-1 -top-4 bg-zinc-900 text-[8px] hidden group-hover:block text-white rounded">
                    <FiTrash2 />
                </div>
                <div className='p-4 bg-zinc-900 text-white border rounded-l-full text-lg'>
                    {logo[data.id]}
                </div>
                <Handle type="source"
                    position={Position.Right}
                    isConnectableStart={true}
                    isConnectable={connections.length < 1}
                />
            </div>
        )
}

export default SourceNode
