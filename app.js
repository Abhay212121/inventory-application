require('dotenv').config()
const express = require('express')
const app = express()

const indexRoute = require('./routes/indexRoute')


app.use('/', indexRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running over PORT:${PORT}`))