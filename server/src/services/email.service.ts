import axios from "axios";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";
import { Resend } from "resend";

const credentialsRepo = AppDataSource.getRepository(Credentials);
export async function emailService(userId: string, result?: string) {
    const emailCred: any = await credentialsRepo.findOne({ where: { platform: 'email', user: { id: userId } } });
    if (!emailCred) {
        throw new Error("Provide Email Credentials")
    }
    const apiKey = emailCred.data.apiKey;
    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
        from: emailCred.data.from,
        to: emailCred.data.to,
        subject: emailCred.data.subject,
        html: `<p>${result ? result : emailCred.data.text}</p>`,
    });

    if (!response.data && response.error)
        throw new Error(response.error.message)

}