import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("songs")
export class song{
    @PrimaryGeneratedColumn()
    id : number
    @CreateDateColumn()
    createAt :Date
    @UpdateDateColumn()
    updateAt : Date
    @Column()
    deletedAt : Date
    @Column()
    title : string
    @Column()
    album_id : string
    @Column()
    genre:string
    @Column()
    duration : number
    @Column()
    file_url : string
    
    downloadUrl:string
}