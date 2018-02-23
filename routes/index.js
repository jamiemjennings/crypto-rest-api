const _ = require('lodash')

const DecryptRouter = require('./decrypt')
const EncryptRouter = require('./encrypt')
const HealthRouter = require('./health')

module.exports = {
  getRoutes () {
    let toReturn = []
    toReturn = _.concat(toReturn, new DecryptRouter().getRoutes())
    toReturn = _.concat(toReturn, new EncryptRouter().getRoutes())
    toReturn = _.concat(toReturn, new HealthRouter({healthPath: '/_health'}).getRoutes())
    return toReturn
  }
}
