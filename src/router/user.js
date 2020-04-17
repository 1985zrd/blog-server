const Router = require('koa-router')
// const { CustomError } = require('../utils/res-model.js')
const xss = require('xss')

const jwtAuth = require("koa-jwt")

const config = require('../config/index')

const secret = 'rd_1985@163.com'

const { signUp, signIn, signOut, userinfo } = require('../controller/user')

const router = new Router({
  prefix: '/api/user'
})

router.post('/signUp', async (ctx, next) => {
  ctx.body = await signUp(ctx)
})

router.post('/signIn', async (ctx, next) => {
  ctx.body = await signIn(ctx)
})

router.post('/signOut', async (ctx, next) => {
  ctx.body = await signOut(ctx)
})

router.post('/userinfo', jwtAuth({
  secret
}), async (ctx, next) => {
  ctx.body = await userinfo(ctx)
})

// router.get('/login', async (ctx, next) => {
//   let str = '<script>alert(1)</script>'
//   console.log(xss(str))
//   ctx.body = xss(str)
// })

module.exports = router
