const koaRoute = require('koa-route')
const _ = require('lodash')

const DEFAULT_HEALTH_ROUTE = '/_health'

class HealthRouter {
  constructor (options = {}) {
    this.healthPath = HealthRouter._normalizeHealthPath(options.healthPath)
    this.logger = options.logger || require('../util/defaultLogger')
  }

  getHealth (ctx, next) {
    ctx.body = { status: 'OK' }
    ctx.status = 200
    next()
  }

  getRoutes () {
    return [
      koaRoute.get(this.healthPath, this.getHealth.bind(this))
    ]
  }

  static _normalizeHealthPath (val) {
    if (!val) {
      return DEFAULT_HEALTH_ROUTE
    }
    if (!_.isString(val) || val.trim().length < 2 || val.lastIndexOf('/') > 0) {
      throw new Error(`Invalid health path value: ${val}`)
    }
    return val.startsWith('/') ? val.trim() : `/${val.trim()}`
  }
}

module.exports = HealthRouter
