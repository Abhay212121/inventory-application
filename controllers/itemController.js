const db = require('../db/queries')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

const password = process.env.PASSWORD;
const nameRegex = /^[A-Za-z0-9 ]+$/;
const passwordRegex = new RegExp(`^${password}$`)

const validateItemChangeForm = [
    body('itemName').trim().isLength({ min: 1, max: 30 }).withMessage('Item name must be between 1 to 30 characters.').matches(nameRegex).withMessage('Item name contains unexpected letter.'),
    body('password').matches(passwordRegex).withMessage('Password is wrong!')
]


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

const getEditItemForm = async (req, res) => {
    const itemId = req.params.itemId;
    const item = await db.getItemById(itemId)
    res.render('editItemForm', { item: item[0], errors: [] })
}

const postItem = [validateItemChangeForm, async (req, res) => {
    const errors = validationResult(req);
    const itemId = req.params.itemId;
    const item = await db.getItemById(itemId)
    if (!errors.isEmpty()) {
        return res.status(400).render('editItemForm', { errors: errors.array(), item: item[0] })
    }

    const action = req.body.editItemBtn;
    const newItemName = req.body.itemName;

    if (action == 'update') {
        await db.updateItemNameInDb(itemId, newItemName)
        res.redirect('/')
    }
    else if (action == 'delete') {
        await db.deleteItemFromDb(itemId)
        res.redirect('/')
    }
}]

module.exports = { getItems, getEditItemForm, postItem };
