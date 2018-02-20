const assert = require('chai').assert
const sinon = require('sinon')
const EncryptRouter = require('../../routes/encrypt')
const blankLogger = require('../blankLogger')

const CryptoService = require('../../services/cryptoService')

describe('EncryptRouter', function () {
  let cryptoService = new CryptoService()
  let _cryptoService = sinon.mock(cryptoService)

  let router = new EncryptRouter({logger: blankLogger, cryptoService})

  describe('constructor', function () {
    it('accepts a no-arg call and creates default dependencies', () => {
      let instance = new EncryptRouter()
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
      assert.isNotNull(instance.cryptoService)
    })
    it('accepts a custom logger', () => {
      let myLogger = { a: '123' }
      let instance = new EncryptRouter({logger: myLogger})
      assert.isNotNull(instance)
      assert.deepEqual(instance.logger, myLogger)
      assert.isNotNull(instance.cryptoService)
    })
    it('accepts a custom cryptoService', () => {
      let myCryptoService = { a: '234' }
      let instance = new EncryptRouter({cryptoService: myCryptoService})
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
      assert.deepEqual(instance.cryptoService, myCryptoService)
    })
  })
  describe('encrypt()', function () {
    it('sets body and calls back after encryption', (done) => {
      let mockCtx = {}
      let returnVal = {a: 1, b: 'asdf'}
      _cryptoService.expects('encrypt').withArgs('testKeyName', 'testPlaintextData').resolves(returnVal)
      router.encrypt(mockCtx, () => {
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
