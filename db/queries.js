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

const postNewItemInDb = async (item_name, category_id) => {
    await pool.query('INSERT INTO items(item_name,category_id) VALUES($1,$2)', [item_name, category_id]);
}

const getCategoryNameUsingId = async (id) => {
    const { rows } = await pool.query('SELECT * FROM category WHERE id = ($1)', [id])
    return rows;
}

const updateCategoryNameInDb = async (id, newName) => {
    pool.query(`UPDATE category SET category_name = ($1) WHERE id =${id}`, [newName])
}

const deleteCategoryInDb = async (id) => {
    pool.query(`DELETE FROM category WHERE id=${id}`)
}

const getItemById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id])
    return rows
}

const updateItemNameInDb = async (id, newName) => {
    await pool.query(`UPDATE items SET item_name = ($1) WHERE id = ${id} `, [newName])
}

const deleteItemFromDb = async (id) => {
    await pool.query(`DELETE FROM items WHERE id = ${id}`)
}

module.exports = { getAllItemsFromDb, getAllCategoriesFromDb, postNewCategoryInDb, getCategoryItemsFromDb, postNewItemInDb, getCategoryNameUsingId, updateCategoryNameInDb, deleteCategoryInDb, getItemById, updateItemNameInDb, deleteItemFromDb }