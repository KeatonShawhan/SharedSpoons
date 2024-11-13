import { pool } from '../db';
import { PostTotal } from '../post';


export class toEatService{

    public async getToEatList(userId:string): Promise < PostTotal[] | undefined > {
        const client = await pool.connect();

        try{
            await client.query('BEGIN');

            const verifyQuery = {
                text: `SELECT * FROM app_user WHERE id = $1`,
                values: [userId],
            };
            const verifyRes = await pool.query(verifyQuery);
            if(verifyRes.rowCount === 0) {
                console.error('User not found');
                return undefined;
            }

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

    public async postToEatList(userId:string, postId: string): Promise < {id:string} | undefined > {
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

            await client.query('COMMIT');

            return rows[0];
            
        }catch (error) {
            await client.query('ROLLBACK');
            console.error('Error getting to eat list:', error);
            console.log('ID: ' + postId + ' User: ' + userId); 
            return undefined;
        } finally {
            client.release();
        }
    }

    public async deleteFromToEat(userId: string, postId: string): Promise<boolean | undefined> {
        try {
            const deleteQuery = {
                text: `DELETE FROM toEat WHERE user_id = $1 AND post_id = $2 RETURNING *`,
                values: [userId, postId],
            };
            const res = await pool.query(deleteQuery);
            if(res.rowCount === 0) {
                console.error('to eat post deletion failed.');
                return undefined;
            }
            return true;

        } catch (error) {
            console.error("Error deleting to eat post:", error);
            return undefined;
        }
    }

    

}