const { Router } = require('express')
const { renderNewCategoryForm, handleNewCategorySubmission } = require('../controllers/newController')

const newRoute = Router()

newRoute.get('/category', renderNewCategoryForm)
newRoute.post('/category', handleNewCategorySubmission)

module.exports = newRoute