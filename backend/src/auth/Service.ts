import * as jwt from "jsonwebtoken";
import {
  Authenticated,
  Credentials,
  SessionUser,
  UserSignUp,
} from "./Index";
import { pool } from "../db";
import { UUID } from '../types/Index';

interface Account {
  id: string;
  username: string;
}

export default interface User {
  id:UUID;
  bio: string;
  pfp: string;
  email: string;
  lastname: string;
  username: string;
  firstname: string;
  phoneNumber: string;
}

export class AuthService {
  public async login(
    credentials: Credentials
  ): Promise<Authenticated | undefined> {
    const select = `SELECT data->>'salt' AS pass FROM app_user WHERE data->>'username' = $1`;
    const query = {
      text: select,
      values: [`${credentials.username}`],
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
    const select2 = `SELECT data || jsonb_build_object('id', id) AS user FROM app_user WHERE data->>'username' = $1::text AND data->>'pwhash' = crypt($2::text, $3::text)`;

    const query2 = {
      text: select2,
      values: [credentials.username, credentials.password, password],
    };
    try {
      const { rows: row } = await pool.query(query2);
      if (row.length != 1) {
        return undefined;
      }
      const user = row[0].user;
      const accessToken = jwt.sign(
        { id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname},
        `${process.env.HASH_MASTER_SECRET}`,
        {
          expiresIn: "7d",
          algorithm: "HS256",
        }
      );
      return { id: user.id, firstname: user.firstname, lastname: user.lastname, accessToken: accessToken, username: user.username };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async signup(info: UserSignUp): Promise<Authenticated | undefined> {
    let select = `SELECT data || jsonb_build_object('id', id) AS user FROM app_user WHERE data->>'email' = $1`;
    let query = { text: select, values: [info.email] };
    const { rows } = await pool.query(query);
    if (rows.length === 1) return undefined;
  
    select = `SELECT data || jsonb_build_object('id', id) AS user FROM app_user WHERE data->>'username' = $1`;
    query = { text: select, values: [info.username] };
    const { rows: usernameRows } = await pool.query(query);
    if (usernameRows.length === 1) return undefined;
  
    select = `SELECT data || jsonb_build_object('id', id) AS user FROM app_user WHERE data->>'phoneNumber' = $1`;
    query = { text: select, values: [info.phoneNumber] };
    const { rows: phoneRows } = await pool.query(query);
    if (phoneRows.length === 1) return undefined;
  
    const insert = `INSERT INTO app_user(data) 
                    VALUES (jsonb_build_object('username', $1::text, 'firstname', $2::text, 'pwhash', '', 'salt', gen_salt('bf'), 'status', 'undefined', 'email', $3::text, 'lastname', $4::text, 'phoneNumber', $5::text, 'location', $6::text))`;
    const query2 = {
      text: insert,
      values: [info.username, info.firstname, info.email, info.lastname, info.phoneNumber, info.location],
    };
    await pool.query(query2);
  
    const selectSalt = `SELECT id, data->>'salt' AS salt FROM app_user WHERE data->>'username' = $1::text`;
    const query3 = { text: selectSalt, values: [info.username] };
    const { rows: saltRows } = await pool.query(query3);
    const { id, salt } = saltRows[0];
  
    const update = `UPDATE app_user
                    SET data = jsonb_set(
                      data, 
                      '{pwhash}',
                      to_jsonb(crypt($1::text, $2::text)),
                      true
                    ) WHERE id = $3`;
    const query4 = { text: update, values: [info.password, salt, id] };
    await pool.query(query4);
  
    const accessToken = jwt.sign(
      { id, username: info.username, firstname: info.firstname, lastname: info.lastname },
      `${process.env.HASH_MASTER_SECRET}`,
      { expiresIn: "7d", algorithm: "HS256" }
    );
  
    return {
      id,
      firstname: info.firstname,
      lastname: info.lastname,
      username: info.username,
      accessToken,
    };
  }
  

  public async check(accessToken: string): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        accessToken,
        `${process.env.HASH_MASTER_SECRET}`,
        (err: jwt.VerifyErrors | null, decoded?: object | string) => {
          if (err) {
            reject(err);
          } else {
            const account = decoded as Account;
            resolve({ id: account.id });
          }
        }
      );
    });
  }

  public async getUserInfo(userID:UUID): Promise<User | undefined> {
    const select = `
    SELECT 
    id,
    data->>'bio' AS bio,
    data->>'pfp' AS pfp,
    data->>'email' AS email,
    data->>'lastname' AS lastname,
    data->>'username' AS username,
    data->>'firstname' AS firstname,
    data->>'phoneNumber' AS phoneNumber,
    data->>'location' AS location
    FROM app_user
    WHERE id = $1`;
    const query = {
      text: select,
      values: [userID]
    };
    const { rows } = await pool.query(query);
    if (rows.length == 0) {
      return undefined;
    }
    return rows[0];
  }
}