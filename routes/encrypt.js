const koaRoute = require('koa-route')
const CryptoService = require('../services/cryptoService')

const API_VERSION = 'v1'

class EncryptRouter {
  constructor (options = {}) {
    this.logger = options.logger || require('../util/defaultLogger')
    this.cryptoService = options.cryptoService || new CryptoService()
  }

  encrypt (ctx, next) {
    this.cryptoService.encrypt('testKeyName', 'testPlaintextData').then((data) => {
      ctx.body = data
    })
  }

  getRoutes () {
    return [
      koaRoute.post(`/${API_VERSION}/encrypt`, this.encrypt.bind(this))
    ]
  }
}

module.exports = EncryptRouter
