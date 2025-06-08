const db = require('../db/queries')

const getItems = async (req, res) => {
    const categoryId = req.params.id;
    const allItems = await db.getAllItemsFromDb()
    const itemsByCategory = await db.getCategoryItemsFromDb(categoryId)
    const categories = await db.getAllCategoriesFromDb()

    if (categoryId) {
        res.render('index', { categories, items: itemsByCategory, categoryFlag: true, categoryId: categoryId })
    }
    else {
        res.render('index', { categories, items: allItems, categoryFlag: false })
    }

}

module.exports = getItems;
