import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlaylistSong } from "./playlist-song.entity";

@Entity("playlists")
export class Playlist{
    @PrimaryGeneratedColumn()
    id : number

    @CreateDateColumn()
    create_At : Date

    @UpdateDateColumn()
    update_At : Date

    @Column()
    active : boolean
    
    @Column()
    title : string

    @Column()
    description : string 

    @Column()
    userId : number

    @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist)
    playlistSongs : PlaylistSong[]
}