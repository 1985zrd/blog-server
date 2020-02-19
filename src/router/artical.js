const Router = require('koa-router')
const koaBody = require('koa-body')

const checkLoginStatus = require('../middleware/checkLoginStatus')

const { getArticalList, saveArtical, getArticalDetail, zan } = require('../controller/artical.js')

const router = new Router({
  prefix: '/api/artical'
})

router.post('/save', checkLoginStatus, async (ctx, next) => {
  ctx.body = await saveArtical(ctx)
})

router.post('/getList', async (ctx, next) => {
  let data = await getArticalList(ctx)
  ctx.body = data
})

router.get('/getDetail', async (ctx, next) => {
  ctx.body = await getArticalDetail(ctx)
})

router.post('/zan', checkLoginStatus, async (ctx, next) => {
  ctx.body = await zan(ctx)
})

module.exports = router
