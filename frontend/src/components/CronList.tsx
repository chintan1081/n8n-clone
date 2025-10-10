import { Get } from "@/assets/axios"
import { useEffect, useState } from "react"

type AllCronProp = {
    title: string,
    progress: string,
    createdAt: string,
    workflow: any
}

const WebhookList = () => {
    const [allCron, setAllCron] = useState<AllCronProp[]>([]);
    useEffect(() => {
        Get('/api/cron').then((response) => {
            setAllCron(response.data.data)
        }).catch((error) => {
            console.log(error);
            
        })
    }, [])

    return (
        <div className="mt-8">
            <div className="relative overflow-x-auto mx-8">
                <table className="text-sm text-left w-full rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Progress
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Workspace
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {allCron.map((cron, index) =>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th title={cron.title} scope="row" className="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {cron.title}
                                </th>
                                <td title={cron.progress} className="px-6 py-4">
                                    {cron.progress}
                                </td>
                                <td title={cron.workflow.title} className="px-6 py-4">
                                    {cron?.workflow.title}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(cron.createdAt).toLocaleDateString("en-GB", {
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

export default WebhookList;

