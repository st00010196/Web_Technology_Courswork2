const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5000, () => console.log("App is running on port 5000..."))