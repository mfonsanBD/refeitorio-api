import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCamposPrato1645120000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("pratos", new TableColumn({
            name: "lactose",
            type: "boolean",
            isNullable: false,
            default: false
        }));

        await queryRunner.addColumn("pratos", new TableColumn({
            name: "vegano",
            type: "boolean",
            isNullable: false,
            default: false
        }));

        await queryRunner.addColumn("pratos", new TableColumn({
            name: "gluten",
            type: "boolean",
            isNullable: false,
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("pratos", "gluten");
        await queryRunner.dropColumn("pratos", "vegano");
        await queryRunner.dropColumn("pratos", "lactose");
    }

}
