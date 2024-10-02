import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePlaylist1727590995736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"playlists",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                },
                {
                    name:"create_At",
                    type:"timestamp",
                    default:"now()"
                },
                {
                    name:"update_At",
                    type:"timestamp",
                    default:"now()"  
                },
                {
                    name:"active",
                    type:"boolean",
                    default:"true"
                },
                {
                    name:"title",
                    type:"varchar"
                },
                {
                    name:"description",
                    type:"varchar",
                    isNullable:true
                },
                {
                    name:'userId',
                    type:'int'
                }
            ]
        }))
        await queryRunner.createForeignKey("playlists",
            new TableForeignKey({
                columnNames:['userId'],
                referencedColumnNames:['id'],
                referencedTableName:'users',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("playlists")
    }

}
