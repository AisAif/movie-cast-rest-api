import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1704638773538 implements MigrationInterface {
    name = 'FirstMigration1704638773538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cast\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`birthday\` timestamp NOT NULL, \`deadday\` timestamp NULL, \`rating\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_cast\` (\`id\` int NOT NULL AUTO_INCREMENT, \`movieId\` int NOT NULL, \`castId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`language\` varchar(30) NOT NULL, \`status\` varchar(10) NOT NULL, \`rating\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_cast\` ADD CONSTRAINT \`FK_b7c2572fba3f37a6434da594909\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_cast\` ADD CONSTRAINT \`FK_57d321f9532c7551ca28a698b6d\` FOREIGN KEY (\`castId\`) REFERENCES \`cast\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_cast\` DROP FOREIGN KEY \`FK_57d321f9532c7551ca28a698b6d\``);
        await queryRunner.query(`ALTER TABLE \`movie_cast\` DROP FOREIGN KEY \`FK_b7c2572fba3f37a6434da594909\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
        await queryRunner.query(`DROP TABLE \`movie_cast\``);
        await queryRunner.query(`DROP TABLE \`cast\``);
    }

}
