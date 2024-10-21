import { Module } from "@nestjs/common";
import { planController } from "./controller/plan.controller";
import { planService } from "./services/plan.services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { plan } from "src/database/entities/plan.entity";

@Module({
    imports:[TypeOrmModule.forFeature([plan])],
    controllers:[ planController ],
    exports:[planService],
    providers:[ planService ]
})
export class PlanModule{}