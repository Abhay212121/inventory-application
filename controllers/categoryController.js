const db = require('../db/queries')

const getCategoryItems = async (req, res) => {
    const categoryId = req.params.id;
    const itemsByCategory = await db.getCategoryItemsFromDb(categoryId)
    const categories = await db.getAllCategoriesFromDb();
    res.render('itemsByCategory', { items: itemsByCategory, categories: categories })
}


module.exports = { getCategoryItems }