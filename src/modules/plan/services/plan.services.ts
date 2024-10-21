import { plan } from "src/database/entities/plan.entity";
import { Repository } from "typeorm";
import { createPlanDto } from "../dto/createPlan.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
@Injectable()
export class planService{
    constructor(
        @InjectRepository(plan)
        private readonly planRepository : Repository<plan>
    ){}
    create(newplan : createPlanDto){
        return this.planRepository.save({ ... newplan })
    }
    get(){
        return this.planRepository.find()
    }
}