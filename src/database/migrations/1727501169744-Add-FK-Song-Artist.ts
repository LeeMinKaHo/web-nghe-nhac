import { Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddFKSongArtist1727501169744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        // Tạo khóa ngoại
        await queryRunner.createForeignKey(
            'songs',
            new TableForeignKey({
                columnNames:['artist_id'],
                referencedColumnNames:['id'],
                referencedTableName:'artists',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // xóa khóa ngoại
        await queryRunner.dropForeignKey('songs', new TableForeignKey({
            columnNames:['artist_id'],
            referencedColumnNames:['id'],
            referencedTableName:'artists',
            onDelete: 'CASCADE'
        }))
    }

}
