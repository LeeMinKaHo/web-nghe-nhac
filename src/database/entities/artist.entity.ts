import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./song.entity";

 @Entity("artists")
 export class Artist{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    bio:string
    @Column()
    image_Url:string
    @CreateDateColumn()
    create_At:Date
    @Column()
    active:boolean
    @Column()
    userId:number
    @OneToMany(() => Song,(song) => song.artist)
    songs:Song[]

 }