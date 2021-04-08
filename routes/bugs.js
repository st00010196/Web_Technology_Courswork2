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
  const bug = getUserInputs(req)

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

route
.route('/:id/edit')
.get((req, res) => {
  const id = req.params.id
  const bug = bugsManager.getById(id)
  res.render('edit', {bug})
})
.post((req, res) => {
  const bug = getUserInputs(req)

  bugsManager.editBug(bug, (err) => {
    if (err) throw err
    res.redirect('/bugs')
  })
})

route.get('/debug', (req, res) => {
  res.render('debug')
})

route.post('/solution', (req, res) => {
  const refNum = req.body.filter
  const bugToDebug = bugsManager.findSolution(refNum)
  res.render('solution', {bugToDebug})
})

function getUserInputs(request) {
  const bug = {
    refNumber: request.body.refNumber,
    severity: request.body.severity,
    description: request.body.description,
    solution: request.body.solution,
    id: request.params.id
  }
  return bug
}

module.exports = route