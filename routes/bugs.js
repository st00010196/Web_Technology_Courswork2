const express = require('express')
const route = express.Router()

route.use(express.urlencoded( {extended: false }))

const { bugsRepository } = require('../public/js/bugs_repo')
const bugsManager = new bugsRepository()

route
.route('/add')
.get((req, res) => {
  res.render('add', { success: req.query.success})
})
.post((req, res) => {
  const bug = {
    refNumber: req.body.refNumber,
    severity: req.body.severity,
    description: req.body.description,
    solution: req.body.solution
  }

  bugsManager.addBug( bug, (err) => {
    if (err) throw err
    res.redirect('/bugs/add?success=1')
  })
})

route.get('/', (req, res) => {
  const bugs = bugsManager.bugsDb

  res.render('bugs', {bugs})
})

route.get('/:id/delete', (req, res) => {
  const id = req.params.id
  bugsManager.deleteBug(id, (err) => {
    if (err) throw err
    res.redirect('/bugs')
  })
})

module.exports = route