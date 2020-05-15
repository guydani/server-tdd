import { query } from '../service/db.service';
import squel from 'squel';
const postgresSquel = squel.useFlavour('postgres');

export const all = async (tableName: string) => {
	const stringQuery = postgresSquel
		.select()
		.from(tableName)
		.toParam();
	return query(stringQuery);
};

export const where = async (tableName: string, col: string, value: number | string) => {
	const stringQuery = postgresSquel
		.select()
		.from(tableName)
		.where(`${col} = ?`, value)
		.toParam();
	return query(stringQuery);
};

export const find = async (tableName: string, id: number) => {
	return where(tableName, 'id', id);
};

export const create = async (tableName: string, obj: any) => {
	const stringQuery = postgresSquel
		.insert()
		.into(tableName)
		.setFields(obj) // change undefined to null
		.returning('*')
		.toParam();
	return query(stringQuery);
};

export const createBulk = async (tableName: string, arrayOfObject: any[]) => {
	const stringQuery = postgresSquel
		.insert()
		.into(tableName)
		.setFieldsRows(arrayOfObject)
		.returning('*')
		.toParam();
	return query(stringQuery);
};

export const deleteBy = async (tableName: string, col: string, value: number | string) => {
	const stringQuery = postgresSquel
		.delete()
		.from(tableName)
		.where(`${col} = ?`, value)
		.toParam();
	return query(stringQuery);
};

export const deleteById = async (tableName: string, id: number) => {
	return deleteBy(tableName, 'id', id);
};

export const updateBy = async (
	tableName: string,
	whereCol: string,
	whereVal: number | string,
	updateObj: any
) => {
	const stringQuery = postgresSquel
		.update()
		.table(tableName)
		.where(`${whereCol} = ?`, whereVal)
		.setFields(updateObj)
		.returning('*')
		.toParam();
	return query(stringQuery);
};

export const update = async (tableName: string, id: number, updateObj: any) => {
	return updateBy(tableName, 'id', id, updateObj);
};
