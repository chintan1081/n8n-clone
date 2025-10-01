import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

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

    @ManyToOne(() => User, (user) => user.workflow, { onDelete: 'CASCADE'})
    user: User

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date
}