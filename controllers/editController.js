const db = require('../db/queries')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

const nameRegex = /^[A-Za-z0-9 ]+$/;
const password = process.env.PASSWORD;
const passwordRegex = new RegExp(`^${password}$`)
const alphaErr = 'must contain only alphabets.'
const lengthErr = 'is exceeding the characters.'


const validateCategoryEditForm = [
    body('categoryName').trim().matches(nameRegex).withMessage(`Category name ${alphaErr}`).isLength({ min: 1, max: 20 }).withMessage(`Category name ${lengthErr}`),
    body('password').matches(passwordRegex).withMessage('password is wrong!')
]

const getEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id
    let categoryName = await db.getCategoryNameUsingId(categoryId);
    categoryName = categoryName[0].category_name
    res.render('editCategoryForm', { errors: [], categoryName: categoryName, categoryId: categoryId })
}

const postCategory = [validateCategoryEditForm, async (req, res) => {
    const categoryId = req.params.id;
    let categoryName = await db.getCategoryNameUsingId(categoryId);
    categoryName = categoryName[0].category_name
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('editCategoryForm', { categoryName: categoryName, categoryId: categoryId, errors: errors.array() })
    }

    const newName = req.body.categoryName

    const action = req.body.editCategoryBtn;
    if (action == 'update') {
        await db.updateCategoryNameInDb(categoryId, newName)
        res.redirect('/')
    }
    else if (action == 'delete') {
        await db.deleteCategoryInDb(categoryId)
        res.redirect('/')
    }
}]

module.exports = { getEditCategoryForm, postCategory }