import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Get, Post, Put } from '@/assets/axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CredentialsForm() {
    const { id: credentialsId } = useParams();
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [data, setData] = useState<any>({});
    const navigate = useNavigate()

    useEffect(() => {
        if (!credentialsId) {
            if (platform === 'telegram')
                setData({
                    token: "your token",
                    message: "your message"
                })
            else if (platform === 'aiAgent')
                setData({
                    apiKey: "your apikey",
                    prompt: "your prompt"
                })
            else if (platform === 'email')
                setData({
                    apiKey: "enter apikey of Resend",
                    to: "send to",
                    from: "from whom",
                    subject: "enter subject",
                    text: "enter text"
                })
        }
    }, [platform])

    const HandleSubmitCredentials = async (event: any) => {
        event.preventDefault();
        await Post('/api/credential', {
            title,
            platform,
            data
        })
        navigate('/credentials');
    }

    const UpdateCredentials = async (event: any) => {
        event.preventDefault();
        await Put(`/api/credential/${credentialsId}`, {
            title,
            platform,
            data
        })
        navigate('/credentials');
    }

    useEffect(() => {
        if (credentialsId) {
            Get(`/api/credential/${credentialsId}`).then((response) => {
                const data = response.data;
                setTitle(data.title);
                setPlatform(data.platform);
                setData(data.data);
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

                        {data && Object.keys(data).map(key => (
                            <div key={key}>
                                <Label htmlFor={key}>{key}</Label>
                                <Input
                                    onChange={(e) => setData((prev: any) => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))
                                    }
                                    type="text"
                                    id={key}
                                    required
                                    placeholder={data[key]}
                                    value={data[key]}
                                />
                            </div>
                        ))}
                        <Button className='cursor-pointer' type='submit'>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}
