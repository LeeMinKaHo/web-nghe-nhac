import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Playlist } from "./playlist.entity"
import { Song } from "./song.entity"
import { Exclude ,Expose } from "class-transformer"
@Entity("playlist_song")
export class PlaylistSong{
    @PrimaryGeneratedColumn()
    id: number
    @Exclude()
    @Column()
    songId : number
    @Column()
    @Exclude()
    playlistId : number

    @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs)
    playlist: Playlist
    @ManyToOne(() => Song, (song) =>song.playlistSongs )
    song: Song
}