import cron from "node-cron";
import { Cron, CronProgress } from "../entities/cron.entity";
import { executeWorkflow } from "./executeWorkflow.service";
import { AppDataSource } from "../database/appDataSource";

const cornRepository = AppDataSource.getRepository(Cron);
export default async function cronService(cronData: any, workflowId: string, userId: string) {
    const cronString = `${cronData.data.minute} ${cronData.data.hour} ${cronData.data.dayOfMonth} ${cronData.data.month} *`;
    cornRepository.merge(cronData, {
        progress: CronProgress.INPROGRESS
    });
    await cornRepository.save(cronData);
    cron.schedule(cronString, async () => {
        await executeWorkflow(workflowId, userId);
        cornRepository.merge(cronData, {
            progress: CronProgress.DONE
        });
        await cornRepository.save(cronData);
    })
}