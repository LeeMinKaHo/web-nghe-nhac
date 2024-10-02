import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { playlistSongService } from "../services/playlist-song.service";
import { createPlaylistSongDto } from "../dto/create-playlist-song.dto";

@Controller("playlist-song")
export class playlistSongController{
    constructor(
        private PlaylistSongService : playlistSongService
    ){}
    @Get()
    findAll(){
        return this.PlaylistSongService.findAll()
    }    
    @Post()
    create(@Body() newPlaylistSong : createPlaylistSongDto){
        return this.PlaylistSongService.create(newPlaylistSong)
    }
    @Delete()
    delete(@Param('id', ParseIntPipe) id: number){
        return this.PlaylistSongService.delete(id)
    }
}