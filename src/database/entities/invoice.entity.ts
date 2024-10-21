import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./song.entity";

@Entity("invoices")
export class invoice{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    price : number
    @Column()
    user_id : number
    @Column()
    paymentMethod:string
}