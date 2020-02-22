/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';
import tableName from '../const/table-name';

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createFunction(
		'update_timestamp',
		[],
		{ language: 'plpgsql', returns: 'TRIGGER', replace: true },
		`BEGIN
    	NEW.updated_at = now();
    	RETURN NEW;
  	END;`
	);

	await pgm.createTable(tableName.USER_TABLE, {
		id: 'id',
		email: { type: 'varchar(255)', unique: true, notNull: true },
		password: { type: 'varchar(255)', notNull: true },
		active: { type: 'boolean', notNull: true, default: true },
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp')
		},
		updated_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp')
		}
	});

	pgm.createTrigger('users', 'update_users', {
		when: 'BEFORE',
		operation: 'UPDATE',
		function: 'update_row_timestamp',
		level: 'ROW'
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTrigger('users', 'update_users', { ifExists: true });
	pgm.dropTable(tableName.USER_TABLE, { ifExists: true });
}
