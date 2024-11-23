import { pool } from '../db';
import { UUID } from '../types/index';

export class welcomeService {
    public async uploadData(user: UUID, foodsPreferred: string[]): Promise<boolean | undefined> {
        try {
        // Initialize arrays to hold the query placeholders and values
        const valuesClause = [];
        const queryParams = [];
        let paramIndex = 1;

        // Loop through the foodsPreferred array to build the VALUES clause and parameters
        for (const food of foodsPreferred) {
            valuesClause.push(`($${paramIndex}, $${paramIndex + 1})`);
            queryParams.push(user, food);
            paramIndex += 2;
        }

        // Construct the full query string
        const queryText = `INSERT INTO recommend (user_id, dish) VALUES ${valuesClause.join(', ')}`;
        const res = await pool.query(queryText, queryParams);
        if(res.rowCount === 0){
            console.error('Error in welcome/uploadData: Error in uploading data');
            return undefined;
        }
        return true;

        } catch (error) {
            console.error('Error in welcome/uploadData: ', error);
            return undefined;
        }
    }
}