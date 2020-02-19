const { SUCCESS } = require('./res-code.js')

/**
 * 成功
 */
class SuccessModel {
  constructor (data, message) {
    this.message = (typeof data === 'string' ? data : message) || '成功'
    this.data = typeof data === 'string' ? null : data
    this.code = SUCCESS
  }
}

/**
 * 失败, 不需要了，app.js里统一处理了
 */
// class CustomError extends Error {
//   constructor (code, message) {
//     super(message)
//     this.code = code
//     this.message = message
//     this.name = 'CustomError'
//   }
// }

exports.success_cb = (data, message) => {
  return new SuccessModel(data, message)
}
