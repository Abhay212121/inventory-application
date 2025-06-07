const db = require('../db/queries')

async function getAllItems(req, res) {
    const items = await db.getAllItemsFromDb();
    const categories = await db.getAllCategoriesFromDb();
    console.log(items)
    console.log(categories)
    // res.send('ITEMS Are:  ' + items.map((item) => item.item_name).join(','))
    res.render('index', { items, categories })
}


module.exports = getAllItems
