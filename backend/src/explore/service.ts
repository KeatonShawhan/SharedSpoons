import { pool } from "../db";
import { Suggestion } from "./index";
import { PostContent } from "../post";

export class ExploreService {
  public async searchSuggestion(
    input: string,
    currentUsername: string
  ): Promise<Suggestion[] | undefined > {
    const select = `
      SELECT DISTINCT 
        id, 
        data->>'username' as username,
        data->>'firstname' as firstname,
        data->>'lastname' as lastname,
        data->>'pfp' as pfp
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
      pfp: row.pfp
    }));
  }

  public async getExplorePosts(userId: string, limit: number, offset: number): Promise<PostContent[]> {
    const select = `
      SELECT * 
      FROM post 
      WHERE user_id != $1 
      ORDER BY RANDOM() 
      LIMIT $2 
      OFFSET $3
    `;

    const query = {
      text: select,
      values: [userId, limit, offset],
    };

    const { rows } = await pool.query(query);
    return rows;
  }
}
