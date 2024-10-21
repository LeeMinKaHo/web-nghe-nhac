import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class UpdateInvoice1728575871725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:"invoices",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                },
                {
                    name:"price",
                    type:"int"
                },
                {
                    name:"userId",
                    type:"int"
                },
                {
                    name:"vnpTxnRef",
                    type:"varchar"
                },
                {
                    name: 'paymentMethod',
                    type: 'enum',
                    enum: ['PAYPAL', 'MOMO',"VNPAY"],
                    default: `'VNPAY'`,
                }
            ]
        }))
        await queryRunner.createForeignKey("invoices",
            new TableForeignKey({
                columnNames:['userId'],
                referencedColumnNames:['id'],
                referencedTableName:'users',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable("invoices")
    }

}
