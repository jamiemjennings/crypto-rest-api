const koaRoute = require('koa-route')
const CryptoService = require('../services/cryptoService')

const API_VERSION = 'v1'

class DecryptRouter {
  constructor (options = {}) {
    this.logger = options.logger || require('../util/defaultLogger')
    this.cryptoService = options.cryptoService || new CryptoService()
  }

  decrypt (ctx, next) {
    this.cryptoService.decrypt('testKeyName', 'ENCRYPTED_DATA_BLOB').then((data) => {
      ctx.body = data
    })
  }

  getRoutes () {
    return [
      koaRoute.post(`/${API_VERSION}/decrypt`, this.decrypt.bind(this))
    ]
  }
}

module.exports = DecryptRouter
