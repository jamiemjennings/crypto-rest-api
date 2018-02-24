const assert = require('chai').assert
const routesIndex = require('../../routes')

describe('routes/index', function () {
  describe('getRoutes()', function () {
    it('returns an array of routes', () => {
      let routes = routesIndex.getRoutes()
      assert.isArray(routes)
      assert.isNotEmpty(routes)
    })
  })
})
