import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSubcription1728610087712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
         name:"subcriptions",
         columns:[
            {
                name:"id",
                type:"int",
                isPrimary:true,
                isGenerated:true,
                generationStrategy: 'increment',
            },
            {
                name:"invoiceId",
                type:"int"
            },
            {
                name:"planId",
                type:"int"
            },
            {
                name:"startDate",
                type:"timestamp",
                default:"now()"
            },
            {
                name:"endDate",
                type:"timestamp",
            }
         ]   
        }))
        await queryRunner.createForeignKey("subcriptions",
            new TableForeignKey({
                columnNames:['planId'],
                referencedColumnNames:['id'],
                referencedTableName:'plans',
                onDelete: 'CASCADE'
            })
        )
        await queryRunner.createForeignKey("subcriptions",
            new TableForeignKey({
                columnNames:['invoiceId'],
                referencedColumnNames:['id'],
                referencedTableName:'invoices',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
