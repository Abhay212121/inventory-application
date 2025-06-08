const db = require('../db/queries')
const { body, validationResult } = require('express-validator')

const nameRegex = /^[A-Za-z0-9 ]+$/;
const alphaErr = 'must only contain alphabets.'
const lengthErr = 'is exceeding the characters.'

const validateCategoryName = [
    body('categoryName').trim().matches(nameRegex).withMessage(`Category name ${alphaErr}`).isLength({ min: 1, max: 20 }).withMessage(`Category name ${lengthErr}`)
]

const validateItemName = [
    body('itemName').trim().matches(nameRegex).withMessage(`Item name ${alphaErr}`).isLength({ min: 1, max: 20 }).withMessage(`Item name ${lengthErr}`),
    body('categoryId').notEmpty().withMessage('Select a Category')
]

const renderNewCategoryForm = (req, res) => {
    res.render('newCategoryForm', { errors: [] })
}

const handleNewCategorySubmission = [validateCategoryName, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('newCategoryForm', { errors: errors.array() })
    }
    const newCategoryName = req.body.categoryName
    await db.postNewCategoryInDb(newCategoryName);
    res.redirect('/')
}]

const renderNewItemForm = async (req, res) => {
    const categories = await db.getAllCategoriesFromDb()
    res.render('newItemForm', { errors: [], categories: categories })
}

const handleNewItemSubmission = [validateItemName, async (req, res) => {
    const errors = validationResult(req)
    const categories = await db.getAllCategoriesFromDb()
    if (!errors.isEmpty()) {
        return res.status(400).render('newItemForm', { errors: errors.array(), categories: categories })
    }
    const itemName = req.body.itemName;
    const categoryId = req.body.categoryId

    await db.postNewItemInDb(itemName, categoryId)
    res.redirect('/')
}]

module.exports = { renderNewCategoryForm, handleNewCategorySubmission, renderNewItemForm, handleNewItemSubmission }