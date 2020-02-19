const log4js = require('log4js')
const path = require('path')
const fs = require('fs')

const basePath = path.resolve(__dirname, '../logs')

const errorPath = basePath + '/errors/'
const resPath = basePath + '/responses/'

const errorFileName = errorPath + '/error'
const resFileName = resPath + '/response'

/**
 * 确定目录是否存在，不存在则创建
 */
const confirmPath = function (pathStr) {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr)
    console.log('createPath:' + pathStr)
  }
}

log4js.configure({
  appenders: {
    errorLog: {
      type: 'dateFile',
      filename: errorFileName,
      alwaysIncludePattern: true, // 是否总是有后缀
      pattern: 'yyyy-MM-dd.log' // 每小时创建一个新的日志文件？
    },
    responseLog: {
      type: 'dateFile',
      filename: resFileName,
      alwaysIncludePattern: true, // 是否总是有后缀
      pattern: 'yyyy-MM-dd.log' // 每小时创建一个新的日志文件？
    }
  },
  categories: {
    errorLog: {
      appenders: ['errorLog'],
      level: 'error'
    },
    responseLog: {
      appenders: ['responseLog'],
      level: 'info'
    },
    default: {
      appenders: ['responseLog', 'errorLog'],
      level: 'trace'
    }
  },
  disableClustering: true
})

if (basePath) {
  confirmPath(basePath)
  confirmPath(errorPath)
  confirmPath(resPath)
}

module.exports = log4js
