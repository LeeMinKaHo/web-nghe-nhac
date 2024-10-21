import { Subcription } from "src/database/entities/subcription.entity";
import { Repository } from "typeorm";

export class subcriptionService
{
    constructor(
        private readonly _subcriptionRepository : Repository<Subcription>
    ){}
    create(){
        
    }
}