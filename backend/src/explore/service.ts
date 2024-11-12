import { pool } from "../db";

import {Suggestion} from './index';

export class ExploreService {

public async searchSuggestion(input: string, currentUsername: string): Promise<Suggestion[]> {
    const select = `
    SELECT DISTINCT 
      id, 
      data->>'username' as username
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

  const suggestions = rows.map((row) => ({
    id: row.id,
    username: row.username,
  }));

  return suggestions;
}
}