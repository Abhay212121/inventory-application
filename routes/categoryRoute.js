const { Router } = require('express');
const { getCategoryItems } = require('../controllers/categoryController');

const categoryRoute = Router()

categoryRoute.get('/:id', getCategoryItems)

module.exports = categoryRoute;