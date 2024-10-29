import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "src/database/entities/artist.entity";
import { Repository } from "typeorm";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { updateArtistDto } from "../dto/update-artist.dto";
import { user } from "src/database/entities/user.entity";
import { PaginationDto } from "src/shared/pagination/dto/pagination.dto";
import { RolesGuard } from "src/guards/roles.guards";
import { Roles } from "src/modules/users/decorators/roles.decoration";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";

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
   
    async create(newArtist: CreateArtistDto, currentUser: user) {
        const artist = await this.artistRepository.findOneBy({ userId: currentUser.id });
        if (artist) {
            return { message: "You have already registered as an artist." }; // Trả về đối tượng với thông điệp
        }
        const savedArtist = await this.artistRepository.save({
            ...newArtist,
            userId: currentUser.id,
        });
        return savedArtist; // Trả về artist đã lưu
    }
    
    async update(User : user,updateArtist : updateArtistDto ){
        await this.artistRepository.update({ userId: User.id }, updateArtist);
        return await this.artistRepository.findOneBy({ userId:User.id  });
      }
    async delete(User : user){
        let artist = await this.artistRepository.findOneBy({ userId: User.id })
        artist.active = false
        this.artistRepository.save(artist)
        return "Delete Successful"
    }
}