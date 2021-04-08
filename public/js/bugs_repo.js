const fs = require('fs')

class bugsRepository {
  constructor() {
    this.bugsDb = []

    fs.readFile('./data/bugs.json', (err, data) => {
      if (err) throw err
      this.bugsDb = JSON.parse(data)
    })
  }

  addBug(bug, callback) {
    bug.id = '_' + Math.random().toString(36).substr(2,9)

    this.bugsDb.push(bug)
    this.updateJson(callback)
  }

  updateJson(callback) {
    fs.writeFile('./data/bugs.json', JSON.stringify(this.bugsDb), callback)
  }

  deleteBug(id, callback) {
    const bug = this.getById(id)
    this.bugsDb.splice(this.bugsDb.indexOf(bug), 1)
    this.updateJson(callback)
  }

  getById(id) {
    return this.bugsDb.find(bug => bug.id === id)
  }

  editBug(updatedBug, callback) {
    const index = this.bugsDb.findIndex(bug => bug.id === updatedBug.id)

    this.bugsDb[index] = updatedBug
    this.updateJson(callback)
  }

  findSolution(refNum) {
    const bugToDebug = this.bugsDb.find(bug => bug.refNumber === refNum)
    return bugToDebug
  }
}

module.exports.bugsRepository = bugsRepository