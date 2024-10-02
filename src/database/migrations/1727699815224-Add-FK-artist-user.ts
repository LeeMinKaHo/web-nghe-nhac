import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddFKArtistUser1727699815224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("artists",new TableColumn({
            name:"userId",
            type:"int",
            isNullable:true
        }))
        await queryRunner.createForeignKey("artists",new TableForeignKey({
            columnNames:["userId"],
            referencedColumnNames:["id"],
            referencedTableName:"users",
            onDelete:"CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artists")
    }

}
