import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddIndexPlaylistSong1727849592125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex("playlist_song", new TableIndex({
            name: "UQ_playlist_song",
            columnNames: ["songId", "playlistId"],
            isUnique: true
        })); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("playlist_song","UQ_playlist_song")
    }

}
