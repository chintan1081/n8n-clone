import { Get, Post, Put } from "@/assets/axios"
import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type AllWorkflowsProp = {
    id: string,
    title: string,
    nodes: object[],
    edges: object[],
    enable: boolean,
    createdAt: string
}

const WorkflowList = () => {
    const navigate = useNavigate()
    const [allFlowchat, setAllFlowchat] = useState<AllWorkflowsProp[]>([]);

    useEffect(() => {
        Get('/api/workflow').then((response) => {
            setAllFlowchat(response.data)
        }).catch((error) => {
        })
    }, [])

    const HandleCurrentWorkflow = (flowchatId: string) => {
        navigate(`/workflow/${flowchatId}`)
    }

    const HandleNewWorkflow = async () => {
        const response = await Post("/api/workflow", {
            title: '',
            nodes: [],
            edges: []
        });
        navigate(`/workflow/${response.data.data.id}`)
    }

    const UpdateWorkflow = async (workflowId: string, enable: boolean) => {
        const response = await Put(`/api/workflow/${workflowId}`, {
            enable: !enable
        })
        toast.success(response.data.message);
        window.location.reload();
    }

    return (
        <div>
            <div className="grid grid-cols-6 m-4 mx-8">
                <div onClick={() => HandleNewWorkflow()} className="col-span-1 col-start-6 w-full bg-gray-800 hover:bg-gray-900 cursor-pointer p-2 rounded flex items-center gap-2 justify-center ">
                    <p className="text-lg"><FiPlus /></p>
                    New Workflow</div>
            </div>
            <div className="relative overflow-x-auto mx-8">
                <table className="text-sm text-left w-full rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nodes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edges
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Enable
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CreateAt
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFlowchat.map((flowchat, index) =>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" onClick={() => HandleCurrentWorkflow(flowchat.id)} className="px-6 py-4 cursor-pointer hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {flowchat.title}
                                </th>
                                <td className="px-6 py-4">
                                    {flowchat.nodes.length}
                                </td>
                                <td className="px-6 py-4">
                                    {flowchat.edges.length}
                                </td>
                                <td className="px-6 py-4">
                                    <div onClick={() => {
                                        UpdateWorkflow(flowchat.id, flowchat.enable);
                                        flowchat.enable = !flowchat.enable
                                    }} className={`${flowchat.enable ? "bg-orange-600" : "bg-gray-300"} w-fit cursor-pointer flex rounded-4xl`}>
                                        <div className={`w-2 p-2 rounded-full ${flowchat.enable ? 'bg-orange-600' : 'bg-gray-600'}`} />
                                        <div className={`w-2 p-2 rounded-full ${'bg-gray-300'}`} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(flowchat.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WorkflowList
