import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { artistService } from "../services/artist.services";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { updateArtistDto } from "../dto/update-artist.dto";
import { RolesGuard } from "src/guards/roles.guards";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { user } from "src/database/entities/user.entity";
import { Roles } from "src/modules/users/decorators/roles.decoration";

@Controller("artists")
export class artistController{
    constructor(
        private _artistService : artistService
    ){}
    @Get()
    getAll(){
        return this._artistService.getALL()
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
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number,@Body() updateArtist : updateArtistDto){
        return this._artistService.update(id,updateArtist)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this._artistService.delete(id)
    }
}