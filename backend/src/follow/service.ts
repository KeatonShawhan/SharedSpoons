import * as jwt from "jsonwebtoken";
import {
    SentRequest
  } from "./index";
import { pool } from "../db";
import { UUID } from '../types';

export class FollowService {
  public async add(
    sender: UUID,
    receiver: UUID
  ): Promise<SentRequest | undefined> {
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
}
  