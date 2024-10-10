import {Fruit} from '.';
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
            id: row.id, // UUID
            name: row.data.name, // Access name from JSON data
            color: row.data.color, // Access color from JSON data
        }));
    }
}