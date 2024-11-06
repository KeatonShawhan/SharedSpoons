import { pool } from '../db';
import { PostContent, PostTotal } from '.';
import { UUID } from '../types/index';

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

    public async deletePost(postID: UUID, userID: UUID): Promise < boolean | undefined > {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const selectQuery = `
            SELECT user_id FROM post
            WHERE id = $1
            `;
            const selectRes = await client.query(selectQuery, [postID]);
            if (selectRes.rowCount === 0) {
                console.error('Post not found with the specified postID');
                return undefined;
            }
            const postOwnerID = selectRes.rows[0].user_id;
            if (postOwnerID !== userID) {
                console.error('User not authorized to delete this post');
                return undefined;
            }


            const deleteText = `
                DELETE FROM post
                WHERE id = $1
            `;
            const query = {
                text: deleteText,
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

    public async getPost(postID: UUID): Promise < PostContent | undefined > {
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

    public async getAllPosts(userID:UUID): Promise<PostTotal[] | undefined> {
        const select = `SELECT * from post WHERE user_id = $1`;
        const query = {
          text: select,
          values: [userID]
        };
        const { rows } = await pool.query(query);
        if (rows.length == 0) {
          return undefined;
        }
        console.log(rows)
        return rows;

    }
    
    public async editPost(postID: UUID, rating: number, caption: string): Promise < string | undefined > {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const updateQuery = `
            UPDATE post
            SET data = jsonb_set(
                jsonb_set(data, '{rating}', to_jsonb($1::int), true),
                '{caption}', to_jsonb($2::text), true
            )
            WHERE id = $3
            RETURNING data->>'rating' AS rating, data->>'caption' AS caption
            `;


            const query = {
                text: updateQuery,
                values: [rating, caption, postID]
            }

            const res = await client.query(query.text, query.values);

            await client.query('COMMIT');

            if(res.rowCount === 0) {
                console.error('Database update of post failed');
                return undefined;
            }

            const updatedFields = res.rows[0];
            return JSON.stringify({
                rating: updatedFields.rating,
                caption: updatedFields.caption
            });


        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating post:', error);
            return undefined;
        } finally {
            client.release();
        }
    }

}