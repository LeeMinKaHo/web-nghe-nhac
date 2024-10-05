import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1726748433150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:"username",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"email",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"password",
                        type:"varchar",
                    },
                    {
                        name:"createat",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name:"updateat",
                        type:"timestamp",
                        default:"now()"

                    },
                    {
                        name:"avatarUrl",
                        type:"varchar",
                        isNullable:true
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
