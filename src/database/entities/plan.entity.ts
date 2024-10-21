import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("plans")
export class plan{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name:string
    @Column()
    duration:number
    @Column()
    price: number
    @Column()
    durationUnit:string
}