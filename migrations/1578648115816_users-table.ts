/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';
import tableName from '../const/table-name';

export async function up(pgm: MigrationBuilder): Promise<void> {
	await pgm.createTable(tableName.USER_TABLE, {
		id: 'id',
		user_name: { type: 'varchar(255)', unique: true, notNull: true },
		email: { type: 'varchar(255)', unique: true, notNull: true },
		password: { type: 'varchar(255)', notNull: true },
		active: { type: 'boolean', notNull: true, default: true }
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable(tableName.USER_TABLE, { ifExists: true });
}
