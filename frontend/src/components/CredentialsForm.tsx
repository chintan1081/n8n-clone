import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Get, Post, Put } from '@/assets/axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CredentialsForm() {
    const { id: credentialsId } = useParams();
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [data, setData] = useState("");
    const navigate = useNavigate()



    useEffect(() => {
        if (!credentialsId) {
            if (platform === 'telegram')
                setData(JSON.stringify({
                    token: "your token",
                    message: "your message"
                }))
            else if (platform === 'aiAgent')
                setData(JSON.stringify({
                    apiKey: "your apikey",
                    prompt: "your prompt"
                }))
            else if (platform === 'email')
                setData(JSON.stringify({
                    apiKey: "enter apikey of Resend",
                    to: "send to",
                    from: "from whom",
                    subject: "enter subject",
                    text: "enter text"
                }))
        }
    }, [platform])

    const HandleSubmitCredentials = async (event) => {
        event.preventDefault();
        const response = await Post('/api/credential', {
            title,
            platform,
            data: JSON.parse(data)
        })
        navigate('/credentials');

        console.log(response.data);
    }

    const UpdateCredentials = async (event) => {
        event.preventDefault();
        const response = await Put(`/api/credential/${credentialsId}`, {
            title,
            platform,
            data: JSON.parse(data)
        })

        navigate('/credentials');
    }

    useEffect(() => {
        if (credentialsId) {
            Get(`/api/credential/${credentialsId}`).then((response) => {
                const data = response.data;
                console.log(data.nodes, '.nid..............nodedata');
                setTitle(data.title);
                setPlatform(data.platform);
                setData(JSON.stringify(data.data));
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [credentialsId])

    return (
        <section className="py-8">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center mb-8 text-4xl font-semibold lg:text-5xl">Credentials</h1>
                <Card className="mx-auto max-w-lg p-4 shadow-md sm:p-16">
                    <form
                        onSubmit={(event) => credentialsId ? UpdateCredentials(event) : HandleSubmitCredentials(event)}
                        className="**:[&>label]:block space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Title</Label>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="title"
                                required
                                value={title}
                            />
                        </div>

                        <div>
                            <Label htmlFor="platform">Platform</Label>
                            <Select onValueChange={(val) => setPlatform(val)} value={platform}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Platfrom" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="telegram">Telegram</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="aiAgent">Gemini</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="data">Data</Label>
                            <Textarea
                                id="data"
                                rows={3}
                                onChange={(e) => setData(e.target.value)}
                                value={data}
                            />
                        </div>
                        <Button className='cursor-pointer' type='submit'>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}
