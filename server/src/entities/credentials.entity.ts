import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ schema: "core", name: "credentials" })
export class Credentials {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    platform: string

    @Column({ type: "jsonb" })
    data: string

    @ManyToOne(() => User, (user) => user.credentials, { onDelete: 'CASCADE' })
    user: User

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date
}