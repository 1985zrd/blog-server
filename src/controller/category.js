const Category = require('../model/category.js')
const { success_cb } = require('../utils/res-model')

exports.getCategory = async () => { //
  let data
  try {
    data = await Category.Find({})
  } catch (e) {
    ctx.error(503, '数据查询失败')
  }
  return success_cb(data)
}

exports.setCategory = async (ctx) => { //
  if (!ctx.request.body.name) {
    ctx.error(400, '请输入name')
  }
  let _category = new Category({
    name: ctx.request.body.name
  })
  let res
  try {
    res = await _category.save()
  } catch (e) {
    ctx.error(503, '保存数据失败')
  }
  return success_cb(res)
}
