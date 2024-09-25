import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')
export class token{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    tokenValue:string
    @CreateDateColumn()
    createAt:Date
    @Column()
    expireAt:Date
    @Column()
    userID:number
}