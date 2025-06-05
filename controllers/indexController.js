const db = require('../db/queries')

async function getAllItems(req, res) {
    const items = await db.getAllItemsFromDb();
    console.log(items)
    res.send('ITEMS Are:  ' + items.map((item) => item.item_name).join(','))
}

module.exports = getAllItems
