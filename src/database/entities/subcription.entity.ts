import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subcriptions")
export class Subcription{
    @PrimaryGeneratedColumn()
        id:number
        @Column()
        invoiceId:number
        @Column()
        planId:number
        @Column()
        startDate:Date
        @Column()
        endDate:number
}