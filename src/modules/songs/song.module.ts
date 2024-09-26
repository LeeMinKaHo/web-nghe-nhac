import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { song } from "src/database/entities/song.entity";
import { songService } from "./services/song.services";
import { songController } from "./controllers/song.controller";
import { StorageService } from "./services/storage.services";

@Module({
    imports :[TypeOrmModule.forFeature([song])],
    providers:[ songService ,StorageService],
    controllers:[songController],
    exports:[songService,StorageService]
})
export class songModule{}