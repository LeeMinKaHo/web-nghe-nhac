import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateToken1726982127932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:"tokens",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                },
                {
                    name:"tokenValue",
                    type:"varchar",
                    isUnique:true,
                },
                {
                    name:"createAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name:"expireAt",
                    type:"timestamp"
                },
                {
                    name:"userId",
                    type:"integer",
                }
            ]
        }))
        await queryRunner.createForeignKey(
            'tokens',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Tokens")
    }

}
