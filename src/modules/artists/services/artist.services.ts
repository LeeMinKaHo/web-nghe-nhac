import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "src/database/entities/artist.entity";
import { Repository } from "typeorm";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { updateArtistDto } from "../dto/update-artist.dto";
import { user } from "src/database/entities/user.entity";
import { PaginationDto } from "src/shared/pagination/dto/pagination.dto";

@Injectable()
export class artistService{
    constructor(
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ){}
    getALL(pagination : PaginationDto){
        return  this.artistRepository
       .createQueryBuilder("artist")
       .where("artist.active = true")
       .take(pagination.limit)
       .skip(pagination.offset)
       .getManyAndCount()
    }
    getByID(id : number){
        return this.artistRepository.findOneBy({
            id
        })
    }
    create(newArtist : CreateArtistDto , currentUser : user ){
        return this.artistRepository.save({
            ...newArtist,
            userId : currentUser.id
        })
    }
    async update(id : number ,updateArtist : updateArtistDto ){
        await this.artistRepository.update({ id }, updateArtist);
        return await this.artistRepository.findOneBy({ id });
      }
    async delete(id : number){
        let artist = await this.artistRepository.findOneBy({ id })
        artist.active = false
        this.artistRepository.save(artist)
        return "Delete Successful"
    }
}