const pool = require('./pool')

async function getAllItemsFromDb() {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
}

module.exports = { getAllItemsFromDb }