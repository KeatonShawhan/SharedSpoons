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

    public async getPost(postID: UUID, userId:UUID): Promise < PostContent | undefined > {
        const client = await pool.connect();

        try {
            const selectQuery = `
            SELECT 
                post.*, 
                app_user.data->>'firstname' AS firstname,
                app_user.data->>'lastname' AS lastname,
                CASE 
                    WHEN toEat.post_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS is_saved
            FROM 
                post
            LEFT JOIN 
                app_user ON app_user.id = post.user_id
            LEFT JOIN 
                toEat ON toEat.post_id = post.id AND toEat.user_id = $2
            WHERE 
                post.id = $1;
            `;

            const query = {
                text: selectQuery,
                values: [postID, userId]
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
        const select = 
        `SELECT * from post 
        WHERE user_id = $1 ORDER BY data->>'time' DESC;`;
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

    public async getAllFriendsPosts(id:UUID): Promise<PostTotal[] | undefined> {
        try {
            const findUser = `
            SELECT id FROM app_user
            WHERE id = $1 ORDER BY data->>'time' DESC
            `
            const userQuery = {
                text: findUser,
                values: [id]
            }
            const user = await pool.query(userQuery.text, userQuery.values);
            if (user.rowCount === 0) {
                console.error('User not found:' + id);
                return undefined;
            }

            const select = `
            SELECT 
                post.*, 
                app_user.data->>'firstname' AS firstname,
                app_user.data->>'lastname' AS lastname,
                CASE 
                    WHEN toEat.post_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS is_saved

            FROM 
                post
            INNER JOIN 
                follow ON post.user_id = follow.receiver
            LEFT JOIN 
                app_user ON app_user.id = post.user_id
            LEFT JOIN 
                toEat ON toEat.post_id = post.id AND toEat.user_id = $1
            WHERE 
                follow.sender = $1;
            `;
            const query = {
            text: select,
            values: [id]
            };
            const { rows } = await pool.query(query);
            // need to return an empty array if no posts are found, not undefined. 
            console.log(rows)
            return rows;
        } catch (error) {
            console.error('Error getting all posts:', error);
            return undefined;
        }
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