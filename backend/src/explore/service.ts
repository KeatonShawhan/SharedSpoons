import { pool } from "../db";
import { Suggestion } from "./index";
import { PostContent } from "../post";

export class ExploreService {
  public async searchSuggestion(
    input: string,
    currentUsername: string
  ): Promise<Suggestion[]> {
    const select = `
      SELECT DISTINCT 
        id, 
        data->>'username' as username,
        data->>'firstname' as firstname,
        data->>'lastname' as lastname
      FROM 
        app_user 
      WHERE 
        data->>'username' ILIKE '%' || $1 || '%' 
        AND data->>'username' != $2
      ORDER BY 
        username 
      ASC
      LIMIT 
        10
    `;

    const query = {
      text: select,
      values: [input, currentUsername],
    };

    const { rows } = await pool.query(query);

    return rows.map((row) => ({
      id: row.id,
      username: row.username,
      firstname: row.firstname,
      lastname: row.lastname,
    }));
  }

  public async getExplorePosts(userId: string): Promise<PostContent[]> {
    const select = `
      SELECT * FROM post WHERE user_id != $1 ORDER BY RANDOM() LIMIT 36
    `;

    const query = {
      text: select,
      values: [userId],
    };

    const { rows } = await pool.query(query);
    return rows;
  }
}
