import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnArtist1727510040603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('songs','artist_id','artistId')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('song','artistId','artist_id')
    }

}
