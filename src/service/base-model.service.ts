import { query } from '../service/db.service';

export const all = async (tableName: string) => {
	return query(`SELECT * from ${tableName}`);
};
