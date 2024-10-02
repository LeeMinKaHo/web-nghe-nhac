import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistSong } from "src/database/entities/playlist-song.entity";
import { createPlaylistDto } from "src/modules/playlists/dto/create-playlist.dto";
import { Repository } from "typeorm";
import { createPlaylistSongDto } from "../dto/create-playlist-song.dto";

export class playlistSongService{
    constructor(
        @InjectRepository(PlaylistSong)
        private playlistSongRepository : Repository<PlaylistSong>
    ){}
    findAll(){
        return this.playlistSongRepository.find()
    }
    findOne(){

    }
    create(newPlaylistSong : createPlaylistSongDto){
        return this.playlistSongRepository.save({
            ...newPlaylistSong
        })
    }
    update(){

    }
    async delete(id : number){
        await this.playlistSongRepository.delete({ id });
        return `Delete product with id: ${id} successfully`;
    }
}