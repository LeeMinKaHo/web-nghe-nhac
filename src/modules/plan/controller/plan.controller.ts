import { Body, Controller, Get, Post } from "@nestjs/common";
import { planService } from "../services/plan.services";
import { createPlanDto } from "../dto/createPlan.dto";

@Controller("plans")
export class planController{
    constructor(
        private readonly _planService : planService
    ){}
    @Post()
    create(@Body() CreatePlanDto : createPlanDto ){
        return this._planService.create(CreatePlanDto)
    }
    @Get()
    getAll(){
        return this._planService.get()
    }
}