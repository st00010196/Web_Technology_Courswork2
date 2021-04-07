const express = require('express')
const app = express()

const bugs = require('./routes/bugs')

app.set('view engine', 'pug')

app.use('/static', express.static('./public'))

app.use('/bugs', bugs)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5000, () => console.log("App is running on port 5000..."))