const { Pool } = require('pg');

class Repository {
    constructor() {
        this.pool = new Pool({
            user: 'hyperchess_server',
            host: 'localhost',
            database: 'hyperchess',
            password: '12345',
            port: 5432,
        });
    }

    async save_to_db(numberOfMoves, result, startPosition, moveHistory) {
        pool.query('INSERT INTO chess_results (number_of_moves, result, move_history)\n' +
            '        VALUES ($1, $2, $3)\n' +
            '        RETURNING *', (err, res) => {
            if (err) {
                console.error(err.stack);
            } else {
                console.log(res.rows);
            }
        });
    }
}

module.exports = Repository;