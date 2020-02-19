const log4js = require('./log.config.js')

const errorLog = log4js.getLogger('errorLog')
const resLog = log4js.getLogger('responseLog')

let log = {}
log.info = function (ctx, resTime) {
  if (ctx) {
    resLog.info(formatRes(ctx, resTime))
  }
}
log.error = function (ctx, error, resTime) {
  if (ctx, error) {
    errorLog.error(formatError(ctx, error, resTime))
  }
}

/**
 *  格式化请求日志
 */
const formatReq = function (ctx, resTime) {
  const getClientIp = function (ctx) {
    return ctx.ip || ctx.request.headers['x-forwarded-for']
  }
  let ip = getClientIp(ctx).match(/\d+.\d+.\d+.\d+/)
  let logText = ''
  const method = ctx.method.toUpperCase()
  logText += 'request originalUrl: ' + ctx.originalUrl + '\n'
  logText += 'request client ip: ' + ip + '\n'
  if (method === 'GET') {
    logText += 'request query: ' + JSON.stringify(ctx.query) + '\n'
  } else {
    logText += 'request body' + '\n' + JSON.stringify(ctx.request.body) + '\n'
  }
  logText += 'response time: ' + resTime + '\n'
  return logText
}

/**
 *  格式化响应日志
 */
const formatRes = function (ctx, resTime) {
  let logText = ''
  logText += '\n' + '***** response log start *****' + '\n'
  // 添加请求日志
  logText += formatReq(ctx, resTime)
  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n'
  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'
  logText += '***** response log end ******' + '\n'
  return logText
}

const formatError = function (ctx, error, resTime) {
  let logText = ''
  logText += '\n' + '***** error log start *****' + '\n'
  // 添加请求日志
  logText += formatReq(ctx, resTime)
  // 错误名称
  logText += 'error name: ' + error.name + '\n'
  // 错误信息
  logText += 'error message: ' + error.message + '\n'
  // 错误详情
  logText += 'error stack: ' + error.stack + '\n'
  logText += '***** error log end ******' + '\n'
  return logText
}

module.exports = log
