import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/database/entities/playlist.entity";
import { Repository } from "typeorm";
import { createPlaylistDto } from "../dto/create-playlist.dto";
import { updatePlaylistDto } from "../dto/update-playlist.dto";
import { user } from "src/database/entities/user.entity";
import { plainToClass, plainToInstance } from "class-transformer";

@Injectable()
export class playlistService{
    constructor(
        @InjectRepository(Playlist)
        private playlistRepository : Repository<Playlist>
    ){}
    async findAll(){
        const playlists = await this.playlistRepository.find({
            relations: ["playlistSongs", "playlistSongs.song"]
        });
          // Sử dụng class-transformer để chuyển đổi
        return plainToInstance(Playlist, playlists);
    }
    findOneByID(id : number){
        return this.playlistRepository.findOneBy({id})
    }
    create(newPlaylist : createPlaylistDto,currentUser:user){
        return this.playlistRepository.save({
            ...newPlaylist,
            userId : currentUser.id
        })
    }
    update(id : number , updatePlaylist : updatePlaylistDto){
        return this.playlistRepository.update({id},updatePlaylist)
    }
    delete(id : number){
        return this.playlistRepository.delete({id})
    }
}