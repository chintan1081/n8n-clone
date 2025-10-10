import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Post } from '@/assets/axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const WebhookForm = ({ setIsWebhookOpen }: any) => {
    const [title, setTitle] = useState<string>();
    const [method, setMethod] = useState<string>();
    const [header, setHeader] = useState<string>();
    const [secret, setSecret] = useState<string>();
    const { id: workflowId } = useParams()

    const HandleWebhookForm = async (event: any) => {
        event.preventDefault();
        try {
            const response = await Post("/api/webhook", {
                title,
                method,
                header,
                secret,
                workflowId
            })
            toast.success(response.data.message);
            setIsWebhookOpen(false);
        }catch(error: any){
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <section className="py-8">
                <div className="mx-auto max-w-3xl px-8 lg:px-0">
                    <h1 className="text-center text-white mb-8 text-4xl font-semibold lg:text-5xl">Webhook</h1>
                    <Card className="mx-auto max-w-lg p-4 shadow-md sm:p-16">
                        <form
                            onSubmit={(e) => HandleWebhookForm(e)}
                            className="**:[&>label]:block space-y-6 *:space-y-3">
                            <div>
                                <Label htmlFor="name">Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="platform">Method</Label>
                                <Select required onValueChange={(val) => setMethod(val)} value={method}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="post">Post</SelectItem>
                                        <SelectItem value="get">Get</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="platform">Header</Label>
                                <Select required onValueChange={(val) => setHeader(val)} value={header}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Auth" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="jwtAuth">Jwt Auth</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {header && header !== "none" && <div>
                                <Label htmlFor="name">Secret</Label>
                                <Input
                                    type="text"
                                    id="secret"
                                    required
                                    onChange={(e) => setSecret(e.target.value)}
                                />
                            </div>}
                            <Button className='cursor-pointer mr-2' type='submit'>Submit</Button>
                        </form>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default WebhookForm;
