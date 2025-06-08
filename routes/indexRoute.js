const { Router } = require('express')
const { getItems } = require('../controllers/itemController')

const indexRoute = Router()

indexRoute.get('/', getItems)

module.exports = indexRoute