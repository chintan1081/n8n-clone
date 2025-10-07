import { CONNREFUSED } from "dns";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.entity";

@Entity({ schema: "core", name: "webhook" })
export class Webhook {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    method: string

    @Column({ nullable: true })
    path: string

    @Column()
    header: string

    @Column()
    secret: string

    @OneToOne(() => Workflow, (workflow) => workflow.webhook, { nullable: true})
    workflow: Workflow
}