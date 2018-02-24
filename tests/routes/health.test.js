const assert = require('chai').assert
const HealthRouter = require('../../routes/health')
const blankLogger = require('../blankLogger')

describe('HealthRouter', function () {
  var router
  beforeEach(() => {
    router = new HealthRouter({logger: blankLogger})
  })
  describe('constructor', function () {
    it('accepts a no-arg constructor', () => {
      let instance = new HealthRouter()
      assert.isNotNull(instance)
    })
    it('accepts a custom logger', () => {
      let myLogger = { a: '123' }
      let instance = new HealthRouter({logger: myLogger})
      assert.isNotNull(instance)
      assert.deepEqual(instance.logger, myLogger)
    })
    it('accepts a custom route path on healthPath property', () => {
      let instance = new HealthRouter({healthPath: '/testHealthPath123'})
      assert.isNotNull(instance)
      assert.isNotNull(instance.logger)
      assert.equal(instance.healthPath, '/testHealthPath123')
    })
  })
  describe('getHealth()', () => {
    it('sets 200 status, returns status OK body and calls next()', (done) => {
      let ctx = {}
      router.getHealth(ctx, () => {
        assert.deepEqual(ctx.body, { status: 'OK' })
        assert.equal(ctx.status, 200)
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
  describe('_normalizeHealthPath()', function () {
    let emptyTests = [
      { val: null, desc: 'Returns default for null' },
      { val: undefined, desc: 'Returns default for null' },
      { val: '', desc: 'Returns default for empty string' }
    ]
    emptyTests.forEach((testData) => {
      it(testData.desc, () => {
        let val = HealthRouter._normalizeHealthPath(testData.val)
        assert.equal(val, '/_health')
      })
    })
    let invalidValTests = [
      { val: '   ', desc: 'Throws error for whitespace' },
      { val: '  \t', desc: 'Throws error for whitespace with tab' },
      { val: 123, desc: 'Throws error for integer' },
      { val: {}, desc: 'Throws error for Object' },
      { val: [], desc: 'Throws error for array' },
      { val: '/util/healthcheck', desc: 'Throws error for nested path' },
      { val: '/healthcheck/', desc: 'Throws error for trailing slash' }
    ]
    invalidValTests.forEach((testData) => {
      it(testData.desc, (done) => {
        try {
          HealthRouter._normalizeHealthPath(testData.val)
        } catch (err) {
          assert.isNotNull(err)
          assert.equal(err, `Error: Invalid health path value: ${testData.val}`)
          done()
        }
      })
    })
    let validTests = [
      { input: '/foobar', expected: '/foobar', desc: 'Returns valid path' },
      { input: 'foobar', expected: '/foobar', desc: 'Prepends / if not exists' }
    ]
    validTests.forEach((testData) => {
      it(testData.desc, () => {
        let val = HealthRouter._normalizeHealthPath(testData.input)
        assert.equal(val, testData.expected)
      })
    })
  })
})
