import { Injectable, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/database/entities/playlist.entity";
import { Repository } from "typeorm";
import { createPlaylistDto } from "../dto/create-playlist.dto";
import { updatePlaylistDto } from "../dto/update-playlist.dto";
import { user } from "src/database/entities/user.entity";
import { plainToClass, plainToInstance } from "class-transformer";
import { PaginationDto } from "src/shared/pagination/dto/pagination.dto";

@Injectable()
export class playlistService{
    constructor(
        @InjectRepository(Playlist)
        private playlistRepository : Repository<Playlist>
    ){}
    async findAll(pagination : PaginationDto){
       return  this.playlistRepository
       .createQueryBuilder("playlist")
       .take(pagination.limit)
       .skip(pagination.offset)
       .getManyAndCount()
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