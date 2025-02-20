import { pool } from '../db';
import { PostTotal } from '../post/Index';


export class toEatService{

  public async getToEatList(userId:string): Promise < PostTotal[] | undefined > {
    try{
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
      console.error('Error getting to eat list:', error);
      return undefined;
    }
  }

  public async postToEatList(userId:string, postId: string): Promise < {id:string} | undefined > {
    try{
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

      return rows[0];
            
    }catch (error) {
      console.error('Error getting to eat list:', error);
      return undefined;
    }
  }

  public async deleteFromToEat(userId: string, postId: string): Promise<boolean | undefined > {
    try {
      const deleteQuery = {
        text: `DELETE FROM toEat WHERE user_id = $1 AND post_id = $2 RETURNING *`,
        values: [userId, postId],
      };
      console.log(deleteQuery);
      const res = await pool.query(deleteQuery);
      console.log(res);
      if (res.rowCount === 0) {
        console.error('ToEat post deletion failed: No matching record.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error deleting ToEat post:', error);
      throw error; // Let the controller handle the error
    }
  }

  public async isInToEat(userId: string, postId: string): Promise<boolean | undefined> {
    try {
      const selectQuery = {
        text: `SELECT * FROM toEat WHERE user_id = $1 AND post_id = $2`,
        values: [userId, postId],
      };
      const res = await pool.query(selectQuery);
      if(res.rowCount === 0) {
        return false;
      }
      return true;

    } catch (error) {
      console.error("Error checking if post is in to eat list:", error);
      return undefined;
    }
  }

    

}