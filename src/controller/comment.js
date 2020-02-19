const Comment = require('../model/comment.js')
const { success_cb } = require('../utils/res-model')
const xss = require('xss')

exports.submit = async (ctx) => { // 注册
  if (!ctx.session.user) {
    ctx.error(401, '用户未登陆')
  }
  let body = ctx.request.body
  if (!body.content || body.content.length > 200) {
    ctx.error(400, '请输入内容，并且内容不能大于200个字')
  }
  if (!body.id) {
    ctx.error(400, '获取不到文章id')
  }
  // xss(str)
  const _data = {
    artical: body.id,
    author: ctx.session.user._id,
    content: xss(body.content)
  }
  let _comment = new Comment({
    ..._data
  }, false)
  let res
  try {
    res = await _comment.save()
  } catch (e) {
    ctx.error(503, '保存出错')
  }
  return success_cb(res)
}

exports.getList = async (ctx) => {
  let body = ctx.request.body
  if (!body.where.artical) {
    ctx.error(400, '获取不到文章id')
  }
  let data
  try {
    data = await Comment.Find({
      where: body.where,
      include: 'author',
      includeword: {
        username: 1,
        email: 1
      },
      limit: body.limit || '',
      order: body.order || '',
      skip: body.skip || ''
    })
  } catch (e) {
    console.log(e)
    ctx.error(503, '查询数据库出错！')
  }
  let result = {}
  result.data = data
  result.total = await Comment.Find({
    where: body.where
  }).countDocuments()
  
  return success_cb(result)
}
