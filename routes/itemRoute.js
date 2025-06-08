const { Router, application } = require('express')
const { getEditItemForm, postItem } = require('../controllers/itemController')

const itemRoute = Router()

itemRoute.get('/edit/:itemId', getEditItemForm)
itemRoute.post('/edit/:itemId', postItem)

module.exports = { itemRoute }