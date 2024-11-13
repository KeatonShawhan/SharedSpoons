import { pool } from "../db";

import { UpdateAccountRequest } from "./index";

export class AccountService {
    public static async usernameAvailable(username: string): Promise<boolean> {
        try {
            const result = await pool.query(
                `SELECT * FROM app_user WHERE data->>username = $1`, 
                [username]
            );
            
            if (result.rows.length === 0) {
                return true;
            } else{
                console.error('Username already in use');
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async updateUserAccount(userId: string, updateRequest: UpdateAccountRequest): Promise<boolean> {
        try {
            const result = await pool.query(
                `SELECT data FROM app_user WHERE id = $1`, 
                [userId]
            );
            
            if (result.rows.length === 0) {
                console.error('User not found');
                return false;
            }

            const currentData = result.rows[0].data;

            const updatedData = { ...currentData };

            if (updateRequest.username !== undefined) updatedData.username = updateRequest.username;
            if (updateRequest.bio !== undefined) updatedData.bio = updateRequest.bio;
            if (updateRequest.location !== undefined) updatedData.location = updateRequest.location;
            if (updateRequest.profilePicture !== undefined) updatedData.pfp = updateRequest.profilePicture;

            const updateResult = await pool.query(
                `UPDATE app_user
                 SET data = $1
                 WHERE id = $2`,
                [updatedData, userId]
            );

            if (updateResult.rows.length > 0) {
                return true;
            } else {
                console.error('Failed to update user data');
                return false;
            }
        } catch (error) {
            console.error('Error updating user account:', error);
            return false;
        }
    }
}
