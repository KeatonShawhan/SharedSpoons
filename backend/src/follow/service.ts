import {
  PfpAccount
} from "./index";
import { pool } from "../db";
import { UUID } from '../types';

export class FollowService {
  public async getFollowers(user: UUID): Promise<PfpAccount[] | undefined> {
    const select = `
          SELECT 
            app_user.id,
            app_user.data->>'firstname' AS firstname,
            app_user.data->>'lastname' AS lastname,
            app_user.data->>'username' AS username,
            app_user.data->>'pfp' AS pfp
          FROM follow
          JOIN app_user ON follow.sender = app_user.id
          WHERE follow.receiver = $1;
        `;
    
    const query = {
      text: select,
      values: [user],
    };
    
    try {
      const { rows } = await pool.query(query);

      if (rows.length === 0) {
        console.log("No followers found for user:", user);
        return []; // return an empty array if no followers
      }
    
      // Map each row to the Account interface
      const followers: PfpAccount[] = rows.map(row => ({
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        username: row.username,
        pfp: row.pfp
      }));
    
      return followers;
          
    } catch (err) {
      console.error("Error fetching followers:", err);
      return undefined;
    }
  }

  public async getFollowersCount(user: UUID): Promise<number | undefined> {
    const select = `
        SELECT 
            COUNT(*) AS follower_count
        FROM follow
        WHERE follow.receiver = $1;
        `;
        
    const query = {
      text: select,
      values: [user],
    };

    try {
      const { rows } = await pool.query(query);

      if (rows.length === 0) {
        console.log("No followers found for user:", user);
        return 0;
      }

      const followerCount = rows[0].follower_count;
      return parseInt(followerCount, 10);
            
    } catch (err) {
      console.error("Error fetching followers count:", err);
      return undefined;
    }
  }

  public async getFollowing(user: UUID): Promise<PfpAccount[] | undefined> {
    const select = `
          SELECT 
            app_user.id,
            app_user.data->>'firstname' AS firstname,
            app_user.data->>'lastname' AS lastname,
            app_user.data->>'username' AS username,
            app_user.data->>'pfp' AS pfp
          FROM follow
          JOIN app_user ON follow.receiver = app_user.id
          WHERE follow.sender = $1;
        `;
    
    const query = {
      text: select,
      values: [user],
    };
    
    try {
      const { rows } = await pool.query(query);
          
      if (rows.length === 0) {
        console.log("No followers found for user:", user);
        return []; // return an empty array if no following
      }
    
      // Map each row to the Account interface
      const followers: PfpAccount[] = rows.map(row => ({
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        username: row.username,
        pfp: row.pfp
      }));
    
      return followers;
          
    } catch (err) {
      console.error("Error fetching followers:", err);
      return undefined;
    }
  }

  public async getFollowingCount(user: UUID): Promise<number | undefined> {
    const select = `
        SELECT 
            COUNT(*) AS follower_count
        FROM follow
        WHERE follow.sender = $1;
        `;
        
    const query = {
      text: select,
      values: [user],
    };

    try {
      const { rows } = await pool.query(query);

      if (rows.length === 0) {
        console.log("User following nobody");
        return 0;
      }

      const followerCount = rows[0].follower_count;
      return parseInt(followerCount, 10);
            
    } catch (err) {
      console.error("Error fetching following count:", err);
      return undefined;
    }
  }

  public async send(sender: UUID, receiver: UUID): Promise<boolean> {
    const checkQuery = {
      text: `SELECT 1 FROM follow WHERE sender = $1 AND receiver = $2`,
      values: [sender, receiver],
    };

    try {
      const checkResult = await pool.query(checkQuery);
      if (checkResult.rows.length > 0) {
        // If a record is found, the sender is already following the receiver
        console.log("Sender is already following the receiver");
        return false;
      }

      // If no record is found, insert the new follow relationship
      const insertQuery = {
        text: `INSERT INTO follow (sender, receiver) VALUES ($1, $2)`,
        values: [sender, receiver],
      };
      await pool.query(insertQuery);
      console.log("Follow relationship created successfully");
      return true;

    } catch (error) {
      console.error("Error creating follow relationship:", error);
      return false;
    }
  }

  public async remove(sender: UUID, receiver: UUID): Promise<boolean> {
    const checkQuery = {
      text: `SELECT 1 FROM follow WHERE sender = $1 AND receiver = $2`,
      values: [sender, receiver],
    };

    try {
      const checkResult = await pool.query(checkQuery);
      if (checkResult.rows.length === 0) {
        // If no record is found, the sender is not following the receiver
        console.log("Sender is not following the receiver");
        return false;
      }

      const deleteQuery = {
        text: `DELETE FROM follow WHERE sender = $1 AND receiver = $2`,
        values: [sender, receiver],
      };
      await pool.query(deleteQuery);
      console.log("Follow relationship deleted successfully");
      return true;

    } catch (error) {
      console.error("Error deleting follow relationship:", error);
      return false;
    }
  }
}
  