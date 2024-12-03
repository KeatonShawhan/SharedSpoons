import { pool } from "../db";

import { UpdateAccountRequest } from "./Index";

export class AccountService {
  public static async usernameAvailable(username: string, id: string): Promise<boolean> {
    try {
      const result = await pool.query(
        `SELECT * FROM app_user WHERE data->>'username' = $1`, 
        [username]
      );
      if (result.rows.length === 0 || result.rows[0].id === id) {
        return true;
      } else{
        console.error('Username already in use');
        return false;
      }
    } catch (error) {
      console.log('Error checking username availability', error);
      return false;
    }
  }

  public static async updateUserAccount(userId: string, updateRequest: UpdateAccountRequest, s3key?: string): Promise<UpdateAccountRequest | null> {
    try {
      const result = await pool.query(
        `SELECT data FROM app_user WHERE id = $1`, 
        [userId]
      );
            
      if (result.rows.length === 0) {
        console.error('User not found');
        return null; // User not found, return null
      }
    
      const currentData = result.rows[0].data;
      const updatedData = { ...currentData };
    
      // Apply the changes from updateRequest
      if (updateRequest.username !== undefined) updatedData.username = updateRequest.username;
      if (updateRequest.bio !== undefined) updatedData.bio = updateRequest.bio;
      if (updateRequest.location !== undefined) updatedData.location = updateRequest.location;
      if (s3key !== undefined) updatedData.pfp = s3key;
    
      // Update the database with the new data
      const updateResult = await pool.query(
        `UPDATE app_user
                 SET data = $1
                 WHERE id = $2 RETURNING *`,
        [updatedData, userId]
      );
    
      // If update was successful, return the updated data
      if (updateResult.rows.length > 0) {
        return {
          username: updatedData.username,
          bio: updatedData.bio,
          location: updatedData.location,
          profilePicture: updatedData.pfp
        };
      } else {
        console.error('Failed to update user data');
        return null; // Return null if update failed
      }
    } catch (error) {
      console.error('Error updating user account:', error);
      return null; // Return null in case of an error
    }
  }        
}
