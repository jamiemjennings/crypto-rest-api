const koaRoute = require('koa-route')

class HealthRouter {
  constructor (options = {}) {
    this.healthPath = options.healthPath || '/_health'
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
}

module.exports = HealthRouter
