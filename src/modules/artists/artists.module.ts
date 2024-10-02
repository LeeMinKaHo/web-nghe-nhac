import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "src/database/entities/artist.entity";
import { artistController } from "./controllers/artists.controllers";
import { artistService } from "./services/artist.services";

@Module({
    imports:[TypeOrmModule.forFeature([Artist])],
    providers:[artistService],
    controllers:[artistController],
})
export class artistModule{}