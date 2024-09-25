import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSong1727176907359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"songs",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isGenerated:true,
                    isPrimary:true,
                    generationStrategy:"increment"
                },
                {
                    name :"createAt",
                    type: "timestamp",
                    default:"now()"
                },
                {
                    name:"updateAt",
                    type:"timestamp",
                    default:"now()"
                },
                {
                    name:"deletedAt",
                    type:"timestamp",
                    isNullable:true
                },
                {
                    name:"title",
                    type:"varchar"
                },
                {
                    name:"album_id",
                    type:"varchar",
                },
                {
                    name:"genre",
                    type:"varchar"
                },
                {
                    name:"duration",
                    type:"int"
                },
                {
                    name:"file_url",
                    type:"varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("songs")
    }

}
