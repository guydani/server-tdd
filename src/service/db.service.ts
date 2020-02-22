import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export class DbService {
	static instance: DbService;
	private pool!: Pool; // ! - for ts error

	constructor() {
		if (DbService.instance) {
			return DbService.instance;
		}
		this.pool = this.createPool();
		DbService.instance = this;
	}

	private createPool = () => {
		return new Pool({
			connectionString:
				process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
		});
	};

	query = async (queryString: string) => {
		try {
			const res = await this.pool.query(queryString);
			return res.rows;
		} catch (err) {
			console.error('Error executed query', queryString);
			return err;
		}
	};
}
