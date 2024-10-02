import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from "typeorm";

export class CreatePlaylistSong1727675698486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"playlist_song",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                },
                {
                    name:"songId",
                    type:"int"
                },
                {
                    name:"playlistId",
                    type:"int"
                }
            ]
        }))
        await queryRunner.createForeignKey("playlist_song",
            new TableForeignKey({
                columnNames:['songId'],
                referencedColumnNames:['id'],
                referencedTableName:'songs',
                onDelete: 'CASCADE'
            })
        )
        await queryRunner.createForeignKey("playlist_song",
            new TableForeignKey({
                columnNames:['playlistId'],
                referencedColumnNames:['id'],
                referencedTableName:'playlists',
                onDelete: 'CASCADE'
            })
        )
        await queryRunner.createIndex("playlist_song", new TableIndex({
            name: "UQ_playlist_song",
            columnNames: ["songId", "playlistId"],
            isUnique: true
        })); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("playlist_song")
    }

}
