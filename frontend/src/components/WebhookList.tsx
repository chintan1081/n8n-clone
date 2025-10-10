import { Get } from "@/assets/axios"
import { useEffect, useState } from "react"

type AllWebhookProp = {
    title: string,
    method: string,
    path: string,
    header: string,
    workflow: any
}

const WebhookList = () => {
    const [allWebhook, setAllWebhook] = useState<AllWebhookProp[]>([]);
    useEffect(() => {
        Get('/api/webhook').then((response) => {
            setAllWebhook(response.data.data)
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
                                Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Header
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Workspace
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Path
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allWebhook.map((webhook, index) =>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th title={webhook.title} scope="row" className="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {webhook.title}
                                </th>
                                <td title={webhook.method} className="px-6 py-4">
                                    {webhook.method}
                                </td>
                                <td onClick={() => navigator.clipboard.writeText(webhook.header)} title={webhook.header} className="px-6 py-4 hover:underline cursor-pointer truncate max-w-6">
                                    {webhook.header}
                                </td>
                                <td title={webhook.workflow.title} className="px-6 py-4">
                                    {webhook?.workflow.title}
                                </td>
                                <td title={`${import.meta.env.VITE_BACKEND_URL}/api${webhook.path}`} className="px-6 py-4">
                                    {`${import.meta.env.VITE_BACKEND_URL}/api${webhook.path}`}
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WebhookList;

