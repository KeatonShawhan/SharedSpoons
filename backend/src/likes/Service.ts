import { pool } from '../db';
import { postLiked } from './Index';
import { UUID } from '../types/Index';

export class likeService {
  public async addLike(userId: UUID, postId: UUID): Promise< postLiked | undefined > {
    try {
      const query = 'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *';
      const values = [userId, postId];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        console.error('Could not add like, query failed.');
        return undefined;
      }
      return rows[0];
    } catch (error) {
      console.error('Error adding like', error);
      return undefined;
    }
  }

  public async removeLike(userId: UUID, postId: UUID): Promise< boolean | undefined > {
    try {
      const query = 'DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *';
      const values = [userId, postId];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        console.error('Could not remove like, query failed.');
        return undefined;
      }
      return true;
    } catch (error) {
      console.error('Error removing like', error);
      return undefined;
    }
  }

  public async getLikeCount(postId: UUID): Promise< number | undefined > {
    try {
      const query = 'SELECT COUNT(*) FROM likes WHERE post_id = $1';
      const values = [postId];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        console.error('Could not get like count, query failed.');
        return undefined;
      }
      return parseInt(rows[0].count);
    } catch (error) {
      console.error('Error getting like count', error);
      return undefined;
    }
  }
}