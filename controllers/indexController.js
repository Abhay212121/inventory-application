const db = require('../db/queries')

async function getAllItems(req, res) {
    const items = await db.getAllItemsFromDb();
    const categories = await db.getAllCategoriesFromDb();
    res.render('index', { items, categories })
}


module.exports = getAllItems
