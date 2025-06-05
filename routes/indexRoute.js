const { Router } = require('express')
const getAllItems = require('../controllers/indexController')

const indexRoute = Router()

indexRoute.get('/', getAllItems)

module.exports = indexRoute