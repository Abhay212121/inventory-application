const pool = require('./pool')

const getAllItemsFromDb = async () => {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
}

const getAllCategoriesFromDb = async () => {
    const { rows } = await pool.query('SELECT * FROM category')
    return rows;

}

const postNewCategoryInDb = async (categoryName) => {
    await pool.query('Insert INTO category(category_name) VALUES ($1)', [categoryName])
}

const getCategoryItemsFromDb = async (categoryId) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId])
    return rows;
}

module.exports = { getAllItemsFromDb, getAllCategoriesFromDb, postNewCategoryInDb, getCategoryItemsFromDb }