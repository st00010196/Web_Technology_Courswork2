const express = require('express')
const app = express()

const bugs = require('./routes/bugs')

app.set('view engine', 'pug')

app.use('/static', express.static('./public'))

app.use('/bugs', bugs)

const { bugsRepository } = require('./public/js/bugs_repo')
const bugsManager = new bugsRepository()

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/v1/bugs', (req, res) => {
  res.json(bugsManager.bugsDb)
})

app.listen(5000, () => console.log("App is running on port 5000..."))