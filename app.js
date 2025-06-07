require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const indexRoute = require('./routes/indexRoute')
const newRoute = require('./routes/newRoute')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/new', newRoute);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running over PORT:${PORT}`))