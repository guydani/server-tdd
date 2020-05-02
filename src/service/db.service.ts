import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.native!.Pool({
	connectionString:
		process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
});

export const query = async (queryString: string) => {
	try {
		const res = await pool.query(queryString);
		return res.rows;
	} catch (err) {
		console.error('Error executed query', queryString);
		return Promise.reject(err);
	}
};

export const runTransaction = async (queriesString: string[]) => {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		queriesString.forEach(async query => await client.query(query));
		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');
		Promise.reject(err);
	} finally {
		client.release();
	}
};
