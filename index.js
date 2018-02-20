const Koa = require('koa')
const app = new Koa()

const EncryptRouter = require('./routes/encrypt')
const encryptRouter = new EncryptRouter()
const DecryptRouter = require('./routes/decrypt')
const decryptRouter = new DecryptRouter()

const HTTP_PORT = process.env.HTTP_PORT || 8080

app.on('error', (err, ctx) => {
  if (err && err.status !== 415) {
    console.error('server error', err, ctx)
  }
})

// request logger and main HTTP error handler
app.use(async (ctx, next) => {
  const startTime = Date.now()
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
  const responseTime = Date.now() - startTime
  ctx.set('X-Response-Time', `${responseTime}ms`) // insert header with response time
  // Example: "GET /path - 200 - 5ms"
  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${responseTime}ms - ${ctx.request.ip} ${ctx.headers['user-agent']}`)
})

// content type verification for POST (application/json required)
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && !ctx.is('application/json')) {
    ctx.throw(415, 'Incorrect body type!')
  }
  next()
})

encryptRouter.getRoutes().forEach((route) => { app.use(route) })
decryptRouter.getRoutes().forEach((route) => { app.use(route) })

app.listen(HTTP_PORT)
console.log(`Service running on port ${HTTP_PORT}`)
