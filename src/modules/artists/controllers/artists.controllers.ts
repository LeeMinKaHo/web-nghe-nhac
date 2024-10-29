import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { artistService } from "../services/artist.services";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { updateArtistDto } from "../dto/update-artist.dto";
import { RolesGuard } from "src/guards/roles.guards";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { user } from "src/database/entities/user.entity";
import { Roles } from "src/modules/users/decorators/roles.decoration";
import { PaginationDto } from "src/shared/pagination/dto/pagination.dto";
import { pageDto } from "src/shared/pagination/dto/page.dto";
import { PaginationMetaDataDto } from "src/shared/pagination/dto/pagination-metadata.dto";

@Controller("artists")
export class artistController{
    constructor(
        private _artistService : artistService
    ){}
    @Get()
    async getAll(@Query() pagination : PaginationDto){
        const [data, totalItems] = await this._artistService.getALL(pagination)
        return new pageDto(
            data, 
            new PaginationMetaDataDto(pagination,totalItems)
        )
    }
    @Get(":id")
    getOneByID(@Param('id', ParseIntPipe) id: number)
    {
        return this._artistService.getByID(id)
    }
    @Post()
    @UseGuards(RolesGuard)
    @Roles(['USER'])
    create(@Body() newArtist : CreateArtistDto, @CurrentUser() currentUser:user){
        return this._artistService.create(newArtist, currentUser)
    }
    @Patch()
    @UseGuards(RolesGuard)
    @Roles(['USER'])
    update(@CurrentUser() currentUser : user,@Body() updateArtist : updateArtistDto){
        return this._artistService.update(currentUser,updateArtist)
    }
    @UseGuards(RolesGuard)
    @Roles(['USER'])
    delete(@CurrentUser() currentUser : user){
        return this._artistService.delete(currentUser)
    }
}