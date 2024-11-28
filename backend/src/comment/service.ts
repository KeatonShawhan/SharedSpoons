import { pool } from '../db';
import { CommentJSON, CommentReturn } from '.';
import { UUID } from '../types';

interface Comment {
    data: {
      id: string;
      username: string;
      text: string;
      time: string;
    }
    firstname: string;
    lastname:string;
    pfp: string;
  }

export class commentService {
    public async createComment(userID: UUID, postID: UUID, commentData: CommentJSON): Promise<CommentReturn | undefined> {
        try {
            const insertQuery = `
                INSERT INTO comment (user_id, post_id, data)
                VALUES ($1, $2, $3)
                RETURNING id, user_id as user, data->>'comment' as comment, data->>'time' as time
            `;

            const query = {
                text: insertQuery,
                values: [userID, postID, commentData]
            }

            const res = await pool.query(query.text, query.values);

            if (res.rows.length === 0) {
                console.error('Database insertion of comment creation failed');
                return undefined;
            }

            return res.rows[0]; // returning id, user, comment, time

        } catch (error) {
            console.error('Error creating comment:', error);
            return undefined;
        }
    }

    public async deleteComment(userId: UUID, commentId: UUID): Promise<boolean | undefined> {
        try {
            // check if the comment exists and if the user is authorized to delete it
            const authQuery = {
                text: `SELECT user_id FROM comment WHERE id = $1`,
                values: [commentId],
            };
            const authRes = await pool.query(authQuery);
            if(authRes.rows.length === 0) {
                console.error('Comment not found');
                return undefined;
            }
            if(authRes.rows[0].user_id !== userId) {
                console.error('Unauthorized user');
                return undefined;
            }
            // now delete the comment
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


    public async getComments(postId: UUID): Promise<Comment[] | undefined> {
        const select = `
        SELECT comment.*, 
        app_user.data->>'firstname' AS firstname,
        app_user.data->>'lastname' AS lastname,
        app_user.data->>'pfp' AS pfp
        FROM comment
        LEFT JOIN 
            app_user ON app_user.id = comment.user_id
        WHERE 
            comment.post_id = $1;
        `;
    
        const query = {
          text: select,
          values: [postId],
        };
    
        try {
          const { rows } = await pool.query(query);
          
          if (rows.length === 0) {
            console.log("No comments found for post");
            return [];
        }
          return rows;
          
        } catch (err) {
          console.error("Error fetching comments for post", err);
          return undefined;
        }
      }


      public async getCommentsCount(postId: UUID): Promise<number | undefined> {
        const select = `
        SELECT 
            COUNT(*) AS comment_count
        FROM comment
        WHERE comment.post_id = $1;
        `;
        
        const query = {
        text: select,
        values: [postId],
        };

        try {
            const { rows } = await pool.query(query);
            if (rows.length === 0) {
                console.log("No Comments");
                return 0;
            }

            const followerCount = rows[0].comment_count;
            return parseInt(followerCount, 10);
            
        } catch (err) {
            console.error("Error fetching comment count:", err);
            return undefined;
        }
      }
}