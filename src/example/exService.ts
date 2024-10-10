import {Fruit, FruitInput} from '.';
import { pool } from '../db';
import {SessionUser, UUID} from '../types';

export class ExampleService {
    public async getAll(user: SessionUser): Promise<Fruit[] | undefined> {
        const select = `SELECT * FROM fruit`;
        const query = {
            text: select,
        };
        const { rows } = await pool.query(query);

        return rows.map(row => ({
            id: row.id,
            name: row.data.name, 
            color: row.data.color,
        }));
    }

    public async newFruit(fruit: FruitInput): Promise<Fruit | undefined> {
        const insertQuery = `INSERT INTO fruit (data) VALUES ($1) RETURNING *`;
        const query = {
            text: insertQuery,
            values: [JSON.stringify(fruit)],
        };
        const { rows } = await pool.query(query);

        return rows[0];
    }
}