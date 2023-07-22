import { MigrationInterface, QueryRunner } from "typeorm";

export class FeedTable1690049483198 implements MigrationInterface {
    name = 'FeedTable1690049483198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feeds" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dafbf766ecbb1eb2017732153f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "feeds"`);
    }

}
