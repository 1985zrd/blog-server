const Artical = require('../model/artical.js')
const { success_cb } = require('../utils/res-model')

exports.getArticalList = async (ctx) => { // 获取文章列表
  let data
  let body = ctx.request.body
  if (body.where && !body.where.category) {
    delete body.where.category
  }
  if (body.where && body.where.title) {
    let reg = new RegExp(body.where.title)
    body.where.title = reg
  }
  try {
    data = await Artical.Find({
      where: body.where,
      exclude: {
        content: 0
      },
      include: body.include,
      includeword: body.includeword,
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
  result.total = await Artical.find(body.where).countDocuments()
  
  return success_cb(result)
}

exports.getArticalDetail = async (ctx) => {
  const id = ctx.query.id
  let data
  try {
    data = await Artical.Find({
      where: {
        _id: id
      },
      include: 'author',
      includeword: {
        username: 1,
        email: 1
      },
    })
  } catch (e) {
    ctx.error(503, '查询数据库出错！')
  }
  let result = JSON.parse(JSON.stringify(data[0]))
  let isAlreadyStar = (ctx.session.user && ctx.session.user._id) ? (result.starList.indexOf(String(ctx.session.user._id)) !== -1) : false
  result['isAlreadyStar'] = isAlreadyStar
  return success_cb(result || {})
}

exports.saveArtical = async (ctx) => { // 保存/更新文章
  // 判断字段是否合规
  let body = ctx.request.body
  if (!body.title || !body.content || !body.introduction) {
    ctx.error(400, '标题、简介、和内容不可或缺')
  }
  const _data = {
    author: ctx.session.user._id,
    title: body.title,
    content: body.content,
    introduction: body.introduction,
    imageUrl: body.imageUrl,
    category: body.category,
    anonymous: body.anonymous,
    state: body.state
  }
  let res
  if (body._id) {
    try {
      res = await Artical.Update({
        _id: body._id,
        data: _data
      })
    } catch (e) {
      ctx.error(503, '更新出错！')
    }
  } else {
    let _artical = new Artical({
      ..._data
    }, false)
    try {
      res = await _artical.save()
    } catch (e) {
      ctx.error(503, '保存出错！')
    }
  }
  return success_cb(res)
}

exports.zan = async (ctx) => {
  let body = ctx.request.body
  if (!body.id) {
    ctx.error(400, '获取不到文章id')
  }
  let hasData
  try {
    hasData = await Artical.Find({
      where: {
        _id: body.id,
        starList: {
          $in: [ctx.session.user._id]
        }
      }
    })
  } catch (e) {
    ctx.error(503, '查询出错了')
  }
  if (!!hasData.length) {
    ctx.error(400, '你已经点过赞了')
  }
  let res
  try {
    res = await Artical.Update({
      _id: body.id,
      data: {
        $inc: { star: 1 },
        $addToSet: {
          starList: ctx.session.user._id
        }
      }
    })
  } catch (e) {
    ctx.error(503, '更新出错！')
  }
  return success_cb(res)
}
