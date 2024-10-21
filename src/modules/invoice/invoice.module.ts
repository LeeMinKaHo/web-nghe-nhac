import { Module } from "@nestjs/common";
import { paymentDto } from "./dto/payment.dto";
import { paymentService } from "./services/payment.services";
import { paymentController } from "./controllers/payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { invoice } from "src/database/entities/invoice.entity";
import { invoiceService } from "./services/invoice.services";
import { plan } from "src/database/entities/plan.entity";

@Module({
    imports:[TypeOrmModule.forFeature([invoice,plan])],
    providers: [paymentService , invoiceService],
    controllers: [paymentController]
})
export class invoiceModule{}