import * as jwt from "jsonwebtoken";
import {
    Account
  } from "./index";
import { pool } from "../db";
import { UUID } from '../types';

export class FollowService {
    public async getFollowers(user: UUID): Promise<Account[] | undefined> {
        const select = `
          SELECT 
            app_user.id,
            app_user.data->>'firstname' AS firstname,
            app_user.data->>'lastname' AS lastname,
            app_user.data->>'username' AS username
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
            console.log("No followers found");
            return undefined;
          }
    
          // Map each row to the Account interface
          const followers: Account[] = rows.map(row => ({
            id: row.id,
            firstname: row.firstname,
            lastname: row.lastname,
            username: row.username,
          }));
    
          return followers;
          
        } catch (err) {
          console.error("Error fetching followers:", err);
          return undefined;
        }
      }

      /*
  public async send(
    sender: UUID,
    receiver: UUID
  ): Promise<Account | undefined> {
    const select = `SELECT data->>'salt' AS pass FROM app_user WHERE data->>'username' = $1`;
    const query = {
      text: select,
      values: [sender, receiver],
    };
    let password = "";
    try {
        const { rows } = await pool.query(query);
        if (rows.length != 1) {
            console.log("no users");
            return undefined;
          }
          password = rows[0].pass;
    } catch (err) {
        console.error(err);
        return undefined;
    }
  }
  */
}
  