import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "src/database/entities/playlist.entity";
import { playlistService } from "./services/playlist.service";
import { playlistController } from "./controllers/playlist.Controller";

@Module({
    imports:[TypeOrmModule.forFeature([Playlist])],
    providers:[playlistService],
    controllers:[playlistController]
})
export class PlaylistModule{} 