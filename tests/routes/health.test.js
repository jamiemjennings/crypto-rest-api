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
})
