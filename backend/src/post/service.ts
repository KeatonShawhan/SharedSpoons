import { pool } from '../db';
import { PostContent } from './Index';

export class postService{

    public async createPost(postData: PostContent): Promise < string | undefined > {
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
                console.error('Database insertion of post creation failed');
                return undefined;
            }

            return res.rows[0].id;
            
        }catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating post:', error);
            return undefined;
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
                console.error('Database deletion of post failed');
                return undefined;
            }

            return true;

        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error deleting post:', error);
            return undefined;
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
                console.error('Database retrieval of post failed');
                return undefined;
            }

            return res.rows[0];

        } catch (error) {
            console.error('Error getting post:', error);
            return undefined;
        } finally {
            client.release();
        }
    }

    public async getAllPosts(): Promise<any | undefined> {
        const select = `SELECT * from post`;
        const query = {
          text: select,
        };
        const { rows } = await pool.query(query);
        if (rows.length == 0) {
          return undefined;
        }
        console.log(rows)
        return rows;

      };
    

}