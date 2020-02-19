const Router = require('koa-router')
const { upload } = require('../controller/upload')
const { getCategory, setCategory } = require('../controller/category')

const router = new Router({
  prefix: '/api'
})

router.post('/upload', async (ctx) => {
  ctx.body = await upload(ctx)
})

router.get('/getCategory', async (ctx) => {
  ctx.body = await getCategory(ctx)
})

router.post('/setCategory', async (ctx) => {
  ctx.body = await setCategory(ctx)
})

module.exports = router
