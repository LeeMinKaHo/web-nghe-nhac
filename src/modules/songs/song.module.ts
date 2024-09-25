import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { song } from "src/database/entities/song.entity";
import { songService } from "./services/song.services";
import { songController } from "./controllers/song.controller";

@Module({
    imports :[TypeOrmModule.forFeature([song])],
    providers:[ songService ],
    controllers:[songController],
    exports:[songService]
})
export class songModule{}