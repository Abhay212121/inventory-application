const { Router } = require('express')
const { renderNewCategoryForm, handleNewCategorySubmission, renderNewItemForm, handleNewItemSubmission } = require('../controllers/newController')

const newRoute = Router()

newRoute.get('/category', renderNewCategoryForm)
newRoute.post('/category', handleNewCategorySubmission)

newRoute.get('/item', renderNewItemForm)
newRoute.post('/item', handleNewItemSubmission)

module.exports = newRoute