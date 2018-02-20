const assert = require('chai').assert
const CryptoService = require('../../services/cryptoService')
const blankLogger = require('../blankLogger')

/* eslint-env node, mocha */
describe('CryptoService', function () {
  const service = new CryptoService({logger: blankLogger})

  describe('constructor', function () {
    it('Accepts no-arg constructor and assigns a logger', () => {
      let instance = new CryptoService()
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
    })
    it('Accepts custom logger', () => {
      let myLogger = { a: '123' }
      let instance = new CryptoService({logger: myLogger})
      assert.isNotNull(instance)
      assert.deepEqual(myLogger, instance.logger)
    })
  })
  describe('encrypt', function () {
    it('resolves with keyName and test data', (done) => {
      service.encrypt('TestKeyName', 'TheQuickBrownFox').then((data) => {
        assert.isNotNull(data)
        assert.equal('TestKeyName', data.keyName)
        assert.equal('encrypted_data', data.cipherText)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('decrypt', function () {
    it('resolves with keyName and test data', (done) => {
      service.decrypt('TestKeyName', 'TheQuickBrownFox').then((data) => {
        assert.isNotNull(data)
        assert.equal('TestKeyName', data.keyName)
        assert.equal('decrypted_data', data.plaintext)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
})
