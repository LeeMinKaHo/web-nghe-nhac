import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { playlistService } from "../services/playlist.service";
import { createPlaylistDto } from "../dto/create-playlist.dto";
import { updatePlaylistDto } from "../dto/update-playlist.dto";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { user } from "src/database/entities/user.entity";
import { PaginationDto } from "src/shared/pagination/dto/pagination.dto";
import { pageDto } from "src/shared/pagination/dto/page.dto";
import { PaginationMetaDataDto } from "src/shared/pagination/dto/pagination-metadata.dto";

@Controller("playlists")
export class playlistController{
    constructor(
        private PlaylistService : playlistService
    ){}
    @Get()
    async getAll(@Query()  pagination :PaginationDto){
        const [playlists,totalItems]= await this.PlaylistService.findAll(pagination);
        return new pageDto(
          playlists,
          new PaginationMetaDataDto(pagination,totalItems),
        );
    }
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number ){
        return this.PlaylistService.findOneByID(id)
    }
    @Post()
    create( @Body() newPlaylist : createPlaylistDto, @CurrentUser() currentUser:user ){
        return this.PlaylistService.create(newPlaylist , currentUser)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number  ,@Body() updatePlaylist : updatePlaylistDto){
        return this.PlaylistService.update(id , updatePlaylist)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.PlaylistService.delete(id)
    }
}