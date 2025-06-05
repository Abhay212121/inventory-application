require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Here we go!'))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running over PORT:${PORT}`))