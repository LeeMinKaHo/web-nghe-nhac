import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlan1728609427992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"plans",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                },
                {
                    name:"name",
                    type:"varchar"
                },
                {
                    name:"duration",
                    type:"int"
                },
                {
                    name:"price",
                    type: "int"
                },
                {
                    name:"durationUnit",
                    type: 'enum',
                    enum: ['Week',"Month"],
                    default: `'Month'`,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
