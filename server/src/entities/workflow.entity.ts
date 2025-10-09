import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Webhook } from "./webhook.entity";
import { Cron } from "./cron.entity";

@Entity({ schema: "core", name: "workflow"})
export class Workflow {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({ type: "boolean" , default: false })
    enable: boolean

    @Column({ type: "jsonb"})
    nodes: string

    @Column({ type: "jsonb"})
    edges: string

    @ManyToOne(() => User, (user) => user.workflows, { onDelete: 'CASCADE'})
    user: User

    @OneToOne(() => Webhook, (webhook) => webhook.workflow, { onDelete: 'CASCADE'})
    webhook: Webhook

    @OneToOne(() => Cron, (cron) => cron.workflow)
    cron: Cron

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date
}