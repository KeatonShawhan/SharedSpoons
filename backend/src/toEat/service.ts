import { pool } from '../db';
import { PostContent, PostTotal } from '.';
import { UUID } from '../types/index';

export class toEatService{

    public async getToEatList(userId:string): Promise < any[] | undefined > {
        const client = await pool.connect();

        try{
            await client.query('BEGIN');

            const select = `
                SELECT p.*
                FROM toEat t
                JOIN post p ON t.post_id = p.id
                WHERE t.user_id = $1
            `;

            const query = {
                text: select,
                values: [userId]
            }

            const { rows } = await pool.query(query);

            return rows;
            
        }catch (error) {
            await client.query('ROLLBACK');
            console.error('Error getting to eat list:', error);
            return undefined;
        } finally {
            client.release();
        }
    }

    public async postToEatList(userId:string, postId: string): Promise < any[] | undefined > {
        const client = await pool.connect();

        try{
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO toEat (post_id, user_id)
                VALUES ($1, $2)
                RETURNING post_id
            `;

            const query = {
                text: insertQuery,
                values: [postId, userId]
            }

            const { rows } = await pool.query(query);

            return rows;
            
        }catch (error) {
            await client.query('ROLLBACK');
            console.error('Error getting to eat list:', error);
            return undefined;
        } finally {
            client.release();
        }
    }

    

}