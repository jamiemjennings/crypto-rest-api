const assert = require('chai').assert
const sinon = require('sinon')
const DecryptRouter = require('../../routes/decrypt')
const blankLogger = require('../blankLogger')

const CryptoService = require('../../services/cryptoService')

describe('DecryptRouter', function () {
  let cryptoService = new CryptoService()
  let _cryptoService = sinon.mock(cryptoService)

  let router = new DecryptRouter({logger: blankLogger, cryptoService})

  describe('constructor', function () {
    it('accepts a no-arg call and creates default dependencies', () => {
      let instance = new DecryptRouter()
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
      assert.isNotNull(instance.cryptoService)
    })
    it('accepts a custom logger', () => {
      let myLogger = { a: '123' }
      let instance = new DecryptRouter({logger: myLogger})
      assert.isNotNull(instance)
      assert.deepEqual(instance.logger, myLogger)
      assert.isNotNull(instance.cryptoService)
    })
    it('accepts a custom cryptoService', () => {
      let myCryptoService = { a: '234' }
      let instance = new DecryptRouter({cryptoService: myCryptoService})
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
      assert.deepEqual(instance.cryptoService, myCryptoService)
    })
  })
  describe('decrypt()', function () {
    it('sets body and calls back after decryption', (done) => {
      let mockCtx = {}
      let returnVal = {a: 1, b: 'asdf'}
      _cryptoService.expects('decrypt').withArgs('testKeyName', 'ENCRYPTED_DATA_BLOB').resolves(returnVal)
      router.decrypt(mockCtx, () => {
        assert.equal(mockCtx.body, returnVal)
        done()
      })
    })
  })
  describe('getRoutes()', function () {
    it('returns an array of routes', () => {
      let routes = router.getRoutes()
      assert.isArray(routes)
      assert.isNotEmpty(routes)
    })
  })
})
