import { pool } from '../db';
import { PostInput } from '.';

export class postService{

    public async createPost(postData: PostInput): Promise < boolean | undefined > {
        const client = await pool.connect();

        try{
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO post (user_id, data)
                VALUES ($1, $2)
                RETURNING id
            `;

            const query = {
                text: insertQuery,
                values: [postData.user, postData.data]
            }

            const res = await client.query(query.text, query.values);

            await client.query('COMMIT');

            if(res.rows.length === 0) {
                throw new Error('Database insertion of post creation failed');
                return false;
            }

            return true;
            
        }catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating post:', error);
            throw new Error('Post creation failed in postService');
            return false;
        } finally {
            client.release();
        }
    }
}