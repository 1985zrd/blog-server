/**
 * 用于统一数据查询，有待优化
 */
exports.statics = {
  Find: function (query, cb) {
    if (!query.where) {
      query.where = {}
    }
    if (!query.limit) {
      query.limit = 100
    }
    if (!query.skip) {
      query.skip = 0
    }
    if (!query.order) {
      query.order = {
        createTime: -1
      }
    }
    if (!query.include) {
      query.include = '' // 关联的字段
    }
    if (!query.includeword) {
      query.includeword = {}
    }
    if (!query.exclude) {
      query.exclude = {}
    }
    // exclude  name:0  排除name字段
    return this
    .find(query.where, query.exclude)
    .populate(query.include, query.includeword)
    .sort(query.order)
    .limit(query.limit)
    .skip(query.skip)
    // .exec(cb)
  },
  Update: function (query, cb) {
    query.data.updateTime = Date.now() // 这里中pre save的时候做了更新
    return this
    .updateMany({_id: query._id}, query.data)
    // .exec(cb)
  }
}
/**
 * 使用方法
 * UserSchema.statics = exports.statics
 * model.Find({
 *  where: 
 * })
 * 
 * 
 * 
 */
