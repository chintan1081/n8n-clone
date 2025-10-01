import axios from "axios";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";
import { Resend } from "resend";

const credentialsRepo = AppDataSource.getRepository(Credentials);
export async function emailService(result?: string) {
    const emailCred: any = await credentialsRepo.findOne({ where: { platform: 'email' } });
    const apiKey = emailCred.data.apiKey;
    console.log(emailCred.data,'...emailCred.data');
    
    const resend = new Resend(apiKey);
    try {
        const response = await resend.emails.send({
            from: emailCred.data.from,
            to: emailCred.data.to,
            subject: emailCred.data.subject,
            html: `<p>${result ? result : emailCred.data.text}</p>`,
        });

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}