import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}