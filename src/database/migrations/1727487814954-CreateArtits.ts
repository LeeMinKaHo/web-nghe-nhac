import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtits1727487814954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name:"artists",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:"bio",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"image_Url",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"create_At",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name:"active",
                        type:"boolean",
                        default:"true"
                    }
                ]
            }
    
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artists")
    }

}
