import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Workflow } from "./workflow.entity";
import { Credentials } from "./credentials.entity";

@Entity({ schema: "core", name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({type : "boolean", default: false })
    isVerified: boolean

    @OneToMany(() => Workflow, (workflow) => workflow.user)
    workflow: Workflow[]

    @OneToMany(() => Credentials, (credentials) => credentials.user)
    credentials: Credentials[]
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
    
}