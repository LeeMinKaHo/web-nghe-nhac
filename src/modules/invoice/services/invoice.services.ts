import { InjectRepository } from "@nestjs/typeorm";
import { invoice } from "src/database/entities/invoice.entity";
import { Repository } from "typeorm";
import { createInvoiceDto } from "../dto/create-invoice.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { plan } from "src/database/entities/plan.entity";
import { user } from "src/database/entities/user.entity";
@Injectable()
export class invoiceService{
    constructor(
        @InjectRepository(invoice)
        private _invoiceRepository: Repository<invoice>,
        @InjectRepository(plan)
        private _planRepository : Repository<plan>
    ){}
    async create( CreateInvoiceDto : createInvoiceDto , currentUser : user ){
        const plan = await this._planRepository.findOneBy({id: CreateInvoiceDto.planId})
        if(!plan)
            return new BadRequestException()
        let newInvoice  = this._invoiceRepository.create()
        newInvoice.user_id = currentUser.id
        newInvoice.price = plan.price
        newInvoice.paymentMethod = "VNPAY"

        return this._invoiceRepository.save(newInvoice)
    }
}