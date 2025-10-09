import { Get } from "@/assets/axios"
import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type AllWorkflowsProp = {
    id: string,
    title: string,
    platform: string,
    createdAt: string
}

const Credentials = () => {
    const navigate = useNavigate()
    const [allCredentials, setAllCredentials] = useState<AllWorkflowsProp[]>([]);

    useEffect(() => {
        Get('/api/credential').then((response) => {
            setAllCredentials(response.data)
        }).catch((error) => {
            toast.error(error)
        })
    }, [])

    const HandleCurrentCredentials = (credentialsId: string) => {
        navigate(`/credential/${credentialsId}`)
    }

    return (
        <div>
            <div className="grid grid-cols-6 m-4 mx-8">
                <div onClick={() => navigate('/credential')} className="col-span-1 col-start-6 w-full bg-gray-800 hover:bg-gray-900 cursor-pointer p-2 rounded flex items-center gap-2 justify-center ">
                    <p className="text-lg"><FiPlus /></p>
                    New Credentials</div>
            </div>
            <div className="relative overflow-x-auto mx-8">
                <table className="text-sm text-left w-full rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Platform
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CreateAt
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCredentials.map((credential, index) =>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" onClick={() => HandleCurrentCredentials(credential.id)} className="px-6 py-4 cursor-pointer hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {credential.title}
                                </th>
                                <td className="px-6 py-4">
                                    {credential.platform}
                                </td>

                                <td className="px-6 py-4">
                                    {new Date(credential.createdAt).toLocaleDateString("en-GB", {
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

export default Credentials;

