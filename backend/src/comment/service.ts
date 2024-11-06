import { pool } from '../db';
import { CommentJSON, CommentReturn } from '.';
import { UUID } from '../types';

export class commentService {
    public async createComment(userID: UUID, postID: UUID, commentData: CommentJSON): Promise<CommentReturn | undefined> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO comment (user_id, post_id, data)
                VALUES ($1, $2, $3)
                RETURNING id, user_id as user, data->>'comment' as comment, data->>'time' as time
            `;

            const query = {
                text: insertQuery,
                values: [userID, postID, commentData]
            }

            const res = await client.query(query.text, query.values);

            await client.query('COMMIT');

            if (res.rows.length === 0) {
                console.error('Database insertion of comment creation failed');
                return undefined;
            }

            return res.rows[0]; // returning id, user, comment, time

        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating comment:', error);
            return undefined;
        } finally {
            client.release();
        }
    }

    public async deleteComment(userId: UUID, commentId: UUID): Promise<boolean | undefined> {
        try {
            const deleteQuery = {
                text: `DELETE FROM comment WHERE id = $1 AND user_id = $2 RETURNING data->>'comment' as comment`,
                values: [commentId, userId],
            };
            const res = await pool.query(deleteQuery);
            if(res.rowCount === 0) {
                console.error('Comment deletion failed.');
                return undefined;
            }
            console.log("Comment deleted successfully");
            return true;

        } catch (error) {
            console.error("Error deleting comment:", error);
            return undefined;
        }
    }
}