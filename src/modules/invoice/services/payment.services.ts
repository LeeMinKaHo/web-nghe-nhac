import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { HashAlgorithm, VNPay, VerifyReturnUrl, VnpLocale, ignoreLogger } from 'vnpay';
import { randomUUID } from 'crypto';
import { invoiceService } from './invoice.services';
import { user } from 'src/database/entities/user.entity';
import { createInvoiceDto } from '../dto/create-invoice.dto';

@Injectable()
export class paymentService{
    constructor(
        private readonly _invoiceService :invoiceService
    ){}
    payment ( createInvoice : createInvoiceDto ,currentUser : user ){
        this._invoiceService.create
        const vnpay = new VNPay({
            tmnCode: 'CQOILDCM',
            secureSecret: 'R4K9UANPLT0OFE56OMHJCTSI4Z08TEI5',
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
            hashAlgorithm: HashAlgorithm.SHA512, // tùy chọn
        
            /**
             * Sử dụng enableLog để bật/tắt logger
             * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
             */
            enableLog: true, // optional
        
            /**
             * Hàm `loggerFn` sẽ được gọi để ghi log
             * Mặc định, loggerFn sẽ ghi log ra console
             * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
             *
             * `ignoreLogger` là một hàm không làm gì cả
             */
            loggerFn: ignoreLogger, // optional
        });
        const returnUrl = 'http://localhost:3000/payment/vnpay-return';

        // Tạo URL thanh toán
        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: 10000,
            vnp_IpAddr: "127.0.0.1",
            vnp_TxnRef: "123faf",
            vnp_OrderInfo: 'Thanh toan don hang 12345',
            vnp_OrderType: "250006",
            vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
            vnp_Locale: VnpLocale.VN,
        });
        return paymentUrl;
    }
    verify( query: any){
        try {
            // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ, không đủ dữ liệu
            const vnpay = new VNPay({
                tmnCode: 'CQOILDCM',
                secureSecret: 'R4K9UANPLT0OFE56OMHJCTSI4Z08TEI5',
                vnpayHost: 'https://sandbox.vnpayment.vn',
                testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
                hashAlgorithm: HashAlgorithm.SHA512, // tùy chọn
            
                /**
                 * Sử dụng enableLog để bật/tắt logger
                 * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
                 */
                enableLog: true, // optional
            
                /**
                 * Hàm `loggerFn` sẽ được gọi để ghi log
                 * Mặc định, loggerFn sẽ ghi log ra console
                 * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
                 *
                 * `ignoreLogger` là một hàm không làm gì cả
                 */
                loggerFn: ignoreLogger, // optional
            });
            let verify: VerifyReturnUrl;
            verify = vnpay.verifyReturnUrl(query);
            if (!verify.isVerified) {
                return new BadRequestException();
            }
            if (!verify.isSuccess) {
                return "Thanh toan that bai";
            }
        } catch (error) {
            return new BadRequestException();
        }
    
        // Kiểm tra thông tin đơn hàng và xử lý
    
        return "thanh toan thanh cong";
    }
}
