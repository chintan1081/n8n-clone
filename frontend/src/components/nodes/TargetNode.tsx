import { Handle, Position } from '@xyflow/react'
import { TbBrandTelegram } from 'react-icons/tb'

const TargetNode = () => {
    return (
        <>
            <div className='p-4 bg-zinc-900 text-white border rounded-r-full'>
                <div className='text-lg'><TbBrandTelegram /></div>
            </div>
            <Handle type="target"
                position={Position.Left}
                isConnectableEnd={true} />
        </>
    )
}

export default TargetNode
