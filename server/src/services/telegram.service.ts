import axios from "axios";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const credentialsRepo = AppDataSource.getRepository(Credentials);
async function sendTelegramMessage() {
    const telegram = await credentialsRepo.findOne({ where: { platform: 'telegram'}});
    axios.get('https://api.telegram.org/bot<TOKEN>/getUpdates')
}