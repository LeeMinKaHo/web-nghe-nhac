import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistSong } from "src/database/entities/playlist-song.entity";
import { playlistSongService } from "./services/playlist-song.service";
import { playlistController } from "../playlists/controllers/playlist.Controller";
import { playlistSongController } from "./controllers/playlist-song.controller";


@Module({
    imports:[TypeOrmModule.forFeature([PlaylistSong])],
    providers:[playlistSongService ],
    controllers:[playlistSongController]
})
export class PlaylistSongModule{}