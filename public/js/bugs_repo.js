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

}

module.exports.bugsRepository = bugsRepository