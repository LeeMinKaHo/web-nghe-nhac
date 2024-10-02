import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Artist } from "./artist.entity"
import { PlaylistSong } from "./playlist-song.entity"


@Entity("songs")
export class Song{
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
    @Column()
    artistId:number
    @ManyToOne(() => Artist ,(artist) => artist.songs)
    artist : Artist

    downloadUrl:string

    @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.song)
    playlistSongs : PlaylistSong[]
}