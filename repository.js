const { Pool } = require('pg');

class Repository {
    constructor() {
        this.pool = new Pool({
            user: 'your_username',
            host: 'localhost',
            database: 'your_database_name',
            password: 'your_password',
            port: 5432,
        });
    }

    async save_to_db(numberOfMoves, result, startPosition, moveHistory) {
        const client = await this.pool.connect();
        try {
            const query = `
                INSERT INTO chess_results (number_of_moves, result, move_history)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const { rows } = await client.query(query, [numberOfMoves, result, moveHistory]);
            return rows[0];
        } catch (error) {
            console.error("Error saving chess result:", error);
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = Repository;