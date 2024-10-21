import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { paymentService } from "../services/payment.services";
import { VerifyReturnUrl } from "vnpay";
import { RolesGuard } from "src/guards/roles.guards";
import { Roles } from "src/modules/users/decorators/roles.decoration";
import { user } from "src/database/entities/user.entity";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { createInvoiceDto } from "../dto/create-invoice.dto";
@Controller('payment')
export class paymentController{
    constructor( 
        private readonly _paymentService : paymentService
     ){}
     @Get()
     @UseGuards(RolesGuard)
     @Roles(['USER'])
     async processPayment(  createInvoice : createInvoiceDto, @CurrentUser() currentUser:user ) {
        return this._paymentService.payment(createInvoice ,currentUser)
     }
     @Get('vnpay-return')
     async vnpay_return(@Query() query: any){
        return this._paymentService.verify(query)
     }
}