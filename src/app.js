const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const mongoose = require('mongoose')
const MongooseSrore = require('koa-generic-session-mongo')
const static = require('koa-static')
const koaBody = require('koa-body')

const log = require('./config/log.js')

const articalRouter = require('./router/artical.js')
const userRouter = require('./router/user.js')
const commentRouter = require('./router/comment.js')
const otherRouter = require('./router/other.js')

const config = require('./config')

const cors = require('koa2-cors')

try {
  mongoose.set('useCreateIndex', true)
  mongoose.connect(config.db.url, config.db.options).then(res => {
    // console.log(res)
  }).catch(error => {
    // console.log(error)
  })
} catch (e) {
  console.log(e)
}

const app = new Koa()

// app.use(cors({
//   origin: function(ctx) {
//     return '*'
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'DELETE', 'OPTIONS'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Length', 'X-Requested-With']
// }))

app.use(async (ctx, next) => { // 错误处理
  console.log(ctx.url, ctx.request.method)
  const start = Date.now()
  let ms
  ctx.error = (code, message) => { // 定义统一抛错函数
    if (typeof code === 'string') {
      message = code
      code = 500
    }
    ctx.throw(code, message || '服务器出错了')
  }
  try {
    await next()
    ms = Date.now() - start
    log.info(ctx, ms)
  } catch (error) {
    ctx.body = {
      code: error.status,
      message: error.message
    }
    ctx.app.emit('error', error, ctx)
  }
})

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1024*1024*2 // 2M
  }
}))
app.use(bodyParser())

app.keys = config.app.keys
app.use(session({
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60 * 1,
    httpOnly: true,
    overwrite: true
  },
  // store: new MongooseSrore({
  //   url: config.db.url,
  //   collection: 'sessions'
  // })
  // store: new MongooseSrore({
  //   collection: 'appSessions',
  //   connection: connection,
  //   name: 'AppSession'
  // })
}, app))

app.use(async (ctx, next) => {
  await next()
  if (ctx.status === 404) {
    ctx.error(404, '地址不存在')
  }
})

app.use(articalRouter.routes()).use(articalRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(commentRouter.routes()).use(commentRouter.allowedMethods())
app.use(otherRouter.routes()).use(otherRouter.allowedMethods())

app.use(static(__dirname + '/public'))

app.on('error', (error, ctx) => { // 统一错误处理
  log.error(ctx, error)
})

mongoose.connection.once('open', () => {
  console.log('数据库连接成功！')
  app.listen(9000, function () {
    console.log('serve start')
  })
}).on('error', error => {
  console.log(error)
})
