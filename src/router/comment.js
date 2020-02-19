const Router = require('koa-router')

const { submit, getList } = require('../controller/comment.js')

const router = new Router({
  prefix: '/api/comment'
})

router.post('/submit', async (ctx, next) => {
  ctx.body = await submit(ctx)
})

router.post('/getList', async (ctx, next) => {
  ctx.body = await getList(ctx)
})

module.exports = router
