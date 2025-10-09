import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";

export enum CronProgress {
    DONE = "Done",
    INPROGRESS = "In Progress",
    NOTSTARTED = "Not Started"
}

@Entity()
export class Cron{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    title: string;

    @Column({ type: "jsonb" })
    data: string;

    @Column({ type:'enum', enum: CronProgress, default: CronProgress.NOTSTARTED })
    progress: CronProgress

    @OneToOne(() => Workflow, (workflow) => workflow.cron)
    @JoinColumn()
    workflow: Workflow;

    @CreateDateColumn()
    createdAt: string;
}