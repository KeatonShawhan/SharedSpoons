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
            id: row.id,
            name: row.data.name, 
            color: row.data.color,
        }));
    }

    public async newFruit(fruit: Fruit): Promise<Fruit | undefined> {
        const select = `INSERT into fruit (name, color) VALUES ($1,  $2)`;
        const query = {
            text: select,
            values: [fruit.name, fruit.color]
        };
        const { rows } = await pool.query(query);

        return rows[0];
    }
}