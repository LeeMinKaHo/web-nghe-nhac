import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity('users')
export class user{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    createAt : Date

    @UpdateDateColumn()
    updateat :Date

    @Column()
    username : string

    @Column()
    password : string

    @Column()
    avatarUrl : string

    @Column()
    email:string

    @Column()
    role: string;
}