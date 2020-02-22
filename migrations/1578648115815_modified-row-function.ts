/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createFunction(
		'update_row_timestamp',
		[],
		{ language: 'plpgsql', returns: 'TRIGGER', replace: true },
		`BEGIN
    	NEW.updated_at = now();
    	RETURN NEW;
  	END;`
	);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropFunction('update_row_timestamp', [], { ifExists: true });
}
