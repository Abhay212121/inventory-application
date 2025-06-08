const { Router } = require('express');
const { getItems } = require('../controllers/itemController');
const { getEditCategoryForm, postCategory } = require('../controllers/editController');

const categoryRoute = Router()

categoryRoute.get('/:id', getItems)

categoryRoute.get('/:id/edit', getEditCategoryForm)
categoryRoute.post('/:id/edit', postCategory)


module.exports = categoryRoute;