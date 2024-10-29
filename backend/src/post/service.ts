import { pool } from '../db';
import { PostContent } from '.';

export class postService{

    public async createPost(postData: PostContent): Promise < boolean | undefined > {
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

    public async deletePost(postID: string): Promise < boolean | undefined > {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const deleteQuery = `
                DELETE FROM post
                WHERE id = $1
            `;

            const query = {
                text: deleteQuery,
                values: [postID]
            }

            const res = await client.query(query.text, query.values);

            await client.query('COMMIT');

            if(res.rowCount === 0) {
                throw new Error('Database deletion of post failed');
                return false;
            }

            return true;

        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error deleting post:', error);
            throw new Error('Post deletion failed in postService');
            return false;
        } finally {
            client.release();
        }
    }

    public async getPost(postID: string): Promise < PostContent | undefined > {
        const client = await pool.connect();

        try {
            const selectQuery = `
                SELECT * FROM post
                WHERE id = $1
            `;

            const query = {
                text: selectQuery,
                values: [postID]
            }

            const res = await client.query(query.text, query.values);

            if(res.rows.length === 0) {
                return undefined;
            }

            return res.rows[0];

        } catch (error) {
            console.error('Error getting post:', error);
            throw new Error('Post retrieval failed in postService');
            return undefined;
        } finally {
            client.release();
        }
    }

}