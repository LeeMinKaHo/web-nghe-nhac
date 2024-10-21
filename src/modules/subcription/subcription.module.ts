import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subcription } from "src/database/entities/subcription.entity";



@Module({
    imports :[TypeOrmModule.forFeature([Subcription])],
    providers:[],
    controllers:[],
    exports:[]
})
export class SubcriptionModule{}