import axios from "axios";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const credentialsRepo = AppDataSource.getRepository(Credentials);
export async function telegramService(userId: string, result?: string) {
    const telegramCredential: any = await credentialsRepo.findOne({ where: { platform: 'telegram', user: { id: userId } } });
    if (!telegramCredential) {
        throw new Error("Provide Email Credentials")
    }
    const token = telegramCredential.data.token;
    const data = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);

    if (data.data.result.length === 0)
        throw new Error("first start the convertation with chat bot in telegram")

    const chatId = data.data.result[data.data.result.length - 1].message.chat.id;
    const message = result ? result : telegramCredential.data.message;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    axios.post(url, {
        chat_id: chatId,
        text: message
    })
        .then(response => {
            console.log("Message sent:", response.data);
        })
        .catch(error => {
            throw new Error(error.response.data);
            console.error("Error sending message:", error.response.data);
        });
    return { message: "message send on telegram" }
}