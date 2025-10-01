import { Handle, Position } from '@xyflow/react'
import { FiTrash2 } from 'react-icons/fi'
import { TbBrandTelegram } from 'react-icons/tb'

const TargetNode = ({ data }: any) => {
    return (
        <div className="relative group">
              <div onClick={() => data.onDelete(data.id)} className="absolute p-1 cursor-pointer hover:text-orange-600 -right-1 -top-4 bg-zinc-900 text-[8px] hidden group-hover:block text-white rounded">
                <FiTrash2 />
              </div>
            <div className='p-4 bg-zinc-900 text-white border rounded-r-full'>
                <div className='text-lg'><TbBrandTelegram /></div>
            </div>
            <Handle type="target"
                position={Position.Left}
                isConnectableEnd={true} />
        </div>
    )
}

export default TargetNode
