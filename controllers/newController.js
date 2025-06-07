const db = require('../db/queries')
const { body, validationResult } = require('express-validator')

const alphaErr = 'must only contain alphabets.'
const lengthErr = 'must be between 1 to 10 characters.'

const validateCategoryName = [
    body('categoryName').trim().isAlpha().withMessage(`Category name ${alphaErr}`).isLength({ min: 1, max: 10 }).withMessage(`Category name ${lengthErr}`)
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


module.exports = { renderNewCategoryForm, handleNewCategorySubmission }